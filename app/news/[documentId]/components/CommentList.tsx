"use client";

import LoadingBar from "../../../ui/LoadingBar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Comment } from "@/app/lib/types";
import CommentForm from "./CommentForm";
import CommentReaction from "./CommentReaction";
import { useSession } from "next-auth/react";
import { Trash2 } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
  articleId: string;
  userId?: string;
  onCommentPosted: () => void;
  currentParentCommentId: string | null;
  onSetParentCommentId: (commentId: string | null) => void;
}

export default function CommentList({
  comments,
  articleId,
  userId,
  onCommentPosted,
  currentParentCommentId,
  onSetParentCommentId,
}: CommentListProps) {
  const [commentsState, setCommentsState] = useState<Comment[]>(comments);
  const [deletingComments, setDeletingComments] = useState<Set<number>>(
    new Set(),
  );
  const [replies, setReplies] = useState<Record<string, Comment[]>>({});
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>(
    {},
  );
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );

  const { data: session } = useSession();
  useEffect(() => {
    setCommentsState(comments);
  }, [comments]);

  /** Update reaction locally after backend updates it */
  const handleReactionUpdate = (
    commentId: number,
    reactionType: "like" | "dislike" | null,
    likesCount: number,
    dislikesCount: number,
  ) => {
    setCommentsState((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              currentUserReaction: reactionType,
              likesCount,
              dislikesCount,
            }
          : comment,
      ),
    );
  };

  /** Fetch replies from API and expand the thread */
  const fetchAndExpandReplies = async (commentId: string) => {
    setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
    try {
      const res = await fetch(`/api/comments/${commentId}/replies`);
      const data: Comment[] = await res.json();
      if (res.ok) {
        setReplies((prev) => ({ ...prev, [commentId]: data }));
        setExpandedComments((prev) => new Set(prev).add(commentId));
      } else {
        console.error(data || "Failed to load replies");
      }
    } catch (err) {
      console.error("Error loading replies", err);
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  /** Toggle showing/hiding replies */
  const handleToggleReplies = (commentId: string) => {
    if (expandedComments.has(commentId)) {
      setExpandedComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
      setReplies((prev) => {
        const newReplies = { ...prev };
        delete newReplies[commentId];
        return newReplies;
      });
    } else {
      fetchAndExpandReplies(commentId);
    }
  };

  /** Handle clicking "Reply" button */
  const handleReplyClick = (commentId: string) => {
    if (!userId) {
      alert("You must be logged in to reply");
      return;
    }
    onSetParentCommentId(commentId);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!session?.jwt) {
      alert("You must be logged in to delete comments.");
      return;
    }

    setDeletingComments((prev) => new Set(prev).add(commentId));

    // Save original state for rollback
    const originalCommentsState = commentsState;
    const originalReplies = { ...replies };

    // Optimistically remove comment from top-level
    setCommentsState((prev) => prev.filter((c) => c.id !== commentId));

    // Optimistically remove comment from nested replies
    setReplies((prev) => {
      const newReplies = { ...prev };
      for (const parentId in newReplies) {
        const index = newReplies[parentId].findIndex((c) => c.id === commentId);
        if (index !== -1) {
          newReplies[parentId].splice(index, 1);

          // Decrease parent comment repliesCount if parent exists
          setCommentsState((prevComments) =>
            prevComments.map((comment) =>
              comment.id === Number(parentId)
                ? {
                    ...comment,
                    repliesCount: Math.max(0, comment.repliesCount - 1),
                  }
                : comment,
            ),
          );
        }
      }
      return newReplies;
    });

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
      });

      if (!res.ok) {
        // rollback if API fails
        setCommentsState(originalCommentsState);
        setReplies(originalReplies);
        const errorData = await res.json();
        alert(
          `Failed to delete comment: ${errorData.message || res.statusText}`,
        );
      }
    } catch (error) {
      // rollback if network error
      setCommentsState(originalCommentsState);
      setReplies(originalReplies);
      console.error("Error deleting comment:", error);
      alert("An error occurred while trying to delete the comment.");
    } finally {
      setDeletingComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  /** Render comments recursively (handles nesting) */
  const renderComments = (list: Comment[]) => (
    <div className="space-y-4">
      {list.map((comment) => (
        <div key={comment.id} className="p-4 rounded-lg bg-white">
          {/* Header: Avatar + Username + Date + Delete Button */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              {comment.user?.photoUrl && (
                <Image
                  src={comment.user.photoUrl}
                  alt={comment.user.username || "User"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-gray-800">
                  {comment.user?.username || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {Number(session?.user?.id) === comment.user?.id && (
              <button
                onClick={() => handleDeleteComment(comment.id)}
                disabled={deletingComments.has(comment.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                title="Delete Comment"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Comment Content */}
          <p className="text-gray-700 mb-2">{comment.Content}</p>

          {/* Reactions & Reply */}
          <div className="flex items-center space-x-4 mb-2">
            <CommentReaction
              comment={comment}
              onReactionUpdate={handleReactionUpdate}
            />
            <button
              onClick={() => handleReplyClick(comment.documentId)}
              className="text-[#026C79] text-sm hover:underline"
            >
              Reply
            </button>
          </div>

          {/* Show/Hide Replies */}
          {comment.repliesCount > 0 && (
            <button
              onClick={() => handleToggleReplies(String(comment.id))}
              disabled={loadingReplies[String(comment.id)]}
              className="text-[#026C79] text-sm hover:underline ml-1"
            >
              {loadingReplies[String(comment.id)] ? (
                <span className="inline-flex items-center space-x-1">
                  <LoadingBar className="w-4 h-4" />
                  <span>Loading...</span>
                </span>
              ) : expandedComments.has(String(comment.id)) ? (
                `Hide replies`
              ) : (
                `Show ${comment.repliesCount} replies`
              )}
            </button>
          )}

          {/* Reply Form */}
          {currentParentCommentId === comment.documentId && userId && (
            <div className="mt-4 ml-6">
              <CommentForm
                articleId={articleId}
                userId={userId}
                parentId={comment.documentId}
                onCommentPosted={() => {
                  onCommentPosted();
                  onSetParentCommentId(null);
                }}
                onCancelReply={() => onSetParentCommentId(null)}
              />
            </div>
          )}

          {/* Nested Replies */}
          {expandedComments.has(String(comment.id)) &&
            replies[String(comment.id)] && (
              <div className="ml-6 mt-4 border-l-2 border-gray-300 pl-4">
                {renderComments(replies[String(comment.id)])}
              </div>
            )}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {!userId && (
        <p className="text-center text-gray-600 mb-8">
          Please{" "}
          <Link href="/login" className="text-[#026C79] hover:underline">
            log in
          </Link>{" "}
          to post comments.
        </p>
      )}

      {userId && !currentParentCommentId && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
          <CommentForm
            articleId={articleId}
            userId={userId}
            parentId={null}
            onCommentPosted={onCommentPosted}
            onCancelReply={() => {}}
          />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {commentsState.length > 0 ? (
        renderComments(commentsState.filter((c) => !c.parent))
      ) : (
        <p className="text-gray-600">No comments yet. Be the first!</p>
      )}
    </div>
  );
}
