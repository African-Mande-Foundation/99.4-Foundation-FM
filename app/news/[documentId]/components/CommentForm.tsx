
'use client';

import { useState } from 'react';

interface CommentFormProps {
  articleId: string;
  userId: string | undefined;
  parentId?: string | null;
  onCommentPosted: () => void;
}

const CommentForm = ({ articleId, userId, parentId, onCommentPosted }: CommentFormProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('You must be logged in to post a comment');
      return;
    }
    if (!commentContent.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentContent,
          articleId: articleId,
          userId: userId,
          parentId: parentId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setCommentContent('');
        onCommentPosted();
      } else {
        setError(data.message || 'Failed to post comment');
      }
    } catch (err) {
      setError('An error occurred while posting comment');
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder={parentId ? 'Write a reply...' : 'Write a comment...'}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
      <div className="flex justify-end space-x-2">
        {parentId && (
          <button
            type="button"
            onClick={() => {
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel Reply
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {parentId ? 'Post Reply' : 'Post Comment'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default CommentForm;
