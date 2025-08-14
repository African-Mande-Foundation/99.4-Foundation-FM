"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Comment } from "@/app/lib/types";

interface CommentReactionProps {
  comment: Comment;
  onReactionUpdate: (
    commentId: number,
    reactionType: "like" | "dislike" | null,
    likesCount: number,
    dislikesCount: number,
  ) => void;
}

const CommentReaction = ({
  comment,
  onReactionUpdate,
}: CommentReactionProps) => {
  const { data: session } = useSession();
  const [likesCount, setLikesCount] = useState<number>(comment.likesCount);
  const [dislikesCount, setDislikesCount] = useState<number>(
    comment.dislikesCount,
  );
  const [currentUserReaction, setCurrentUserReaction] = useState<
    "like" | "dislike" | null
  >(comment.currentUserReaction);
  const [loading, setLoading] = useState<boolean>(false);

  const handleReaction = async (reactionType: "like" | "dislike") => {
    if (!session?.jwt) {
      alert("You must be logged in to react to comments");
      return;
    }

    if (loading) return;
    setLoading(true);

    const prevReaction = currentUserReaction;
    const prevLikes = likesCount;
    const prevDislikes = dislikesCount;

    // Optimistic UI update
    if (currentUserReaction === reactionType) {
      setCurrentUserReaction(null);
      if (reactionType === "like") {
        setLikesCount((l) => l - 1);
      } else {
        setDislikesCount((d) => d - 1);
      }
    } else {
      setCurrentUserReaction(reactionType);
      if (reactionType === "like") {
        setLikesCount((l) => l + 1);
        if (prevReaction === "dislike") setDislikesCount((d) => d - 1);
      } else {
        setDislikesCount((d) => d + 1);
        if (prevReaction === "like") setLikesCount((l) => l - 1);
      }
    }

    try {
      const res = await fetch(`/api/comments/${comment.id}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
        body: JSON.stringify({
          reactionType: reactionType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Revert optimistic update
        setCurrentUserReaction(prevReaction);
        setLikesCount(prevLikes);
        setDislikesCount(prevDislikes);
        console.error(data.message || "Failed to update reaction");
      } else {
        // Sync with backend response
        setLikesCount(data.likesCount);
        setDislikesCount(data.dislikesCount);
        setCurrentUserReaction(data.reaction ? data.reaction.type : null);
        onReactionUpdate(
          comment.id,
          data.reaction ? data.reaction.type : null,
          data.likesCount,
          data.dislikesCount,
        );
      }
    } catch (err) {
      // Revert on network error
      setCurrentUserReaction(prevReaction);
      setLikesCount(prevLikes);
      setDislikesCount(prevDislikes);
      console.error("Error updating reaction:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-2">
      <button
        onClick={() => handleReaction("like")}
        disabled={loading}
        className={`flex items-center space-x-1 ${
          currentUserReaction === "like"
            ? "text-[#026C79]"
            : "text-gray-500 hover:text-blue-500"
        }`}
      >
        <ThumbsUp size={16} />
        <span>{likesCount}</span>
      </button>
      <button
        onClick={() => handleReaction("dislike")}
        disabled={loading}
        className={`flex items-center space-x-1 ${
          currentUserReaction === "dislike"
            ? "text-red-500"
            : "text-gray-500 hover:text-red-500"
        }`}
      >
        <ThumbsDown size={16} />
        <span>{dislikesCount}</span>
      </button>
    </div>
  );
};

export default CommentReaction;
