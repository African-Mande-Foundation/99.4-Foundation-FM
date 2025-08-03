
'use client';

import Image from 'next/image';
import { Comment } from '@/app/lib/types';

interface CommentListProps {
  comments: Comment[];
  onReplyClick: (commentId: string) => void;
}

const CommentList = ({ comments, onReplyClick }: CommentListProps) => {
  const renderComments = (comments: Comment[]) => {
    return (
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 rounded-lg">
            <div className="flex items-center mb-2">
              {comment.profile?.photoUrl && (
                <Image
                  src={comment.profile.photoUrl}
                  alt={comment.profile.name || 'User'}
                  width={30}
                  height={30}
                  className="rounded-full mr-2"
                />
              )}
              <p className="font-semibold text-gray-800">{comment.profile?.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-500 ml-2">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
            <p className="text-gray-700">{comment.Content}</p>
            <button
              onClick={() => onReplyClick(comment.documentId)}
              className="text-blue-500 text-sm mt-2 hover:underline"
            >
              Reply
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4">
                {renderComments(comment.replies)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {comments && comments.length > 0 ? (
        renderComments(comments.filter(comment => !comment.parent))
      ) : (
        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentList;
