
'use client';

import { useState } from 'react';

interface CommentFormProps {
  articleId: string;
  userId: string | undefined;
  parentId?: string | null;
  onCommentPosted: () => void;
  onCancelReply: () => void;
}

const CommentForm = ({ articleId, userId, parentId, onCommentPosted, onCancelReply }: CommentFormProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!userId) {
      setError('You must be logged in to post a comment');
      setIsLoading(false);
      return;
    }
    if (!commentContent.trim()) {
      setError('Comment cannot be empty');
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
      />
      <div className="flex justify-end space-x-2">
        {parentId && (
          <button
            type="button"
            onClick={onCancelReply}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            disabled={isLoading}
          >
            Cancel Reply
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {parentId ? 'Posting Reply...' : 'Posting Comment...'}
            </span>
          ) : (
            parentId ? 'Post Reply' : 'Post Comment'
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default CommentForm;
