'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/ui/Navbar';
import Footer from '@/app/ui/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation'

import { Article, Comment } from '@/app/lib/types';

import React from 'react';

export default function ArticlePage() {
  const params = useParams<{ documentId: string }>();
  const { documentId } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${documentId}`);
        const data = await res.json();
        if (res.ok) {
          setArticle(data);
        } else {
          setError(data.message || 'Failed to load article');
        }
      } catch (err) {
        setError('An error occurred while loading the article');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [documentId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
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
          articleId: documentId,
          userId: session.user?.id, // Use user ID from session
          parentId: parentCommentId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setCommentContent('');
        setParentCommentId(null);
        // Re-fetch article to update comments
        const updatedRes = await fetch(`/api/articles/${documentId}`);
        const updatedData = await updatedRes.json();
        if (updatedRes.ok) {
          setArticle(updatedData);
        }
      } else {
        setError(data.message || 'Failed to post comment');
      }
    } catch (err) {
      setError('An error occurred while posting comment');
    }
  };

  const handleReplyClick = (commentId: string) => {
    if (!session) {
      setError('You must be logged in to reply to a comment');
      return;
    }
    setParentCommentId(commentId);
    setCommentContent(`@${commentId} `); // Pre-fill with parent comment ID
  };

  const renderComments = (comments: Comment[]) => {
    return (
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
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
              onClick={() => handleReplyClick(comment.documentId)}
              className="text-blue-500 text-sm mt-2 hover:underline"
            >
              Reply
            </button>
            {comment.replies?.data && comment.replies.data.length > 0 && (
              <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4">
                {renderComments(comment.replies.data)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-800">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-800">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 text-sm mb-2">
          By {article.author?.name || 'Unknown'} on {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        {article.category && (
          <p className="text-gray-600 text-sm mb-4">Category: {article.category.name}</p>
        )}
        {article.cover && (
          <div className="relative w-full h-96 mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.cover.url}`}
              alt={article.cover.alternativeText || article.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        )}
        <div className="prose max-w-none mb-8">
          <p>{article.description}</p>
          {/* Assuming full content would be here, e.g., from a rich text field */}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {session ? (
            <form onSubmit={handleCommentSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder={parentCommentId ? 'Write a reply...' : 'Write a comment...'}
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                {parentCommentId && (
                  <button
                    type="button"
                    onClick={() => {
                      setParentCommentId(null);
                      setCommentContent('');
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
                  {parentCommentId ? 'Post Reply' : 'Post Comment'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          ) : (
            <p className="text-center text-gray-600 mb-8">
              Please <Link href="/login" className="text-blue-500 hover:underline">log in</Link> to post comments.
            </p>
          )}

          {article.comments && article.comments.length > 0 ? (
            renderComments(article.comments.filter(comment => !comment.parent))
          ) : (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
