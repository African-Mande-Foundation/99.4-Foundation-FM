"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Comment } from "@/app/lib/types";
import CommentForm from "./CommentForm";
import CommentReaction from "./CommentReaction";

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
  const [replies, setReplies] = useState<Record<string, Comment[]>>({});
  const [loadingReplies, setLoadingReplies] = useState<Record<string, boolean>>(
    {},
  );
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );

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

  /** Render comments recursively (handles nesting) */
  const renderComments = (list: Comment[]) => (
    <div className="space-y-4">
      {list.map((comment) => (
        <div key={comment.id} className="p-4 rounded-lg bg-white">
          <div className="flex items-center mb-2">
            {comment.user?.photoUrl && (
              <Image
                src={comment.user.photoUrl}
                alt={comment.user.username || "User"}
                width={30}
                height={30}
                className="rounded-full mr-2"
              />
            )}
            <p className="font-semibold text-gray-800">
              {comment.user?.username || "Anonymous"}
            </p>
            <p className="text-sm text-gray-500 ml-2">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-700">{comment.Content}</p>

          {/* Like/Dislike */}
          <CommentReaction
            comment={comment}
            onReactionUpdate={handleReactionUpdate}
          />

          {/* Reply button */}
          <button
            onClick={() => handleReplyClick(comment.documentId)}
            className="text-[#026C79] text-sm mt-2 hover:underline"
          >
            Reply
          </button>

          {/* Show/Hide replies */}
          {comment.repliesCount > 0 && (
            <button
              onClick={() => handleToggleReplies(String(comment.id))}
              disabled={loadingReplies[String(comment.id)]}
              className="text-[#026C79] text-sm mt-2 hover:underline ml-4"
            >
              {loadingReplies[String(comment.id)] ? (
                <span className="inline-flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#026C79]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373
                      0 0 5.373 0 12h4zm2
                      5.291A7.962 7.962 0 014 12H0c0
                      3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : expandedComments.has(String(comment.id)) ? (
                `Hide replies`
              ) : (
                `Show ${comment.repliesCount} replies`
              )}
            </button>
          )}

          {/* Reply form */}
          {currentParentCommentId === comment.documentId && userId && (
            <div className="mt-4 ml-4">
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

          {/* Render nested replies */}
          {expandedComments.has(String(comment.id)) &&
            replies[String(comment.id)] && (
              <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4">
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
