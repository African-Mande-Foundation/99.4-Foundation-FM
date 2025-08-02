'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
  author?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  category?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  cover?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    url: string;
  };
}

interface Comment {
  id: number;
  documentId: string;
  attributes: {
    Content: string;
    createdAt: string;
    profile?: {
      data: {
        attributes: {
          name: string;
          email: string;
          photoUrl?: string;
        };
      };
    };
    replies?: {
      data: Comment[];
    };
    parent?: {
      data: {
        id: number;
        attributes: {
          Content: string;
        };
      };
    };
  };
}

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        if (res.ok) {
          setArticles(data.data);
        } else {
          setError(data.message || 'Failed to load articles');
        }
      } catch (err) {
        setError('An error occurred while loading articles');
      }
    };
    fetchArticles();
  }, []);

  const handleLogout = async () => {
    await import('next-auth/react').then(({ signOut }) => signOut({ callbackUrl: '/login' }));
  };

  const handleCommentSubmit = async (e: React.FormEvent, articleId: string) => {
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
          articleId,
          userId: session.user?.id, // Use user ID from session
          parentId: parentCommentId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setCommentContent('');
        setParentCommentId(null);
        setSelectedArticleId(null);
        // Refetch articles to update comments
        const articlesRes = await fetch('/api/articles');
        const articlesData = await articlesRes.json();
        if (articlesRes.ok) {
          setArticles(articlesData.data);
        }
      } else {
        setError(data.message || 'Failed to post comment');
      }
    } catch (err) {
      setError('An error occurred while posting comment');
    }
  };

  const handleReplyClick = (articleId: string, commentId: string) => {
    if (!session) {
      setError('You must be logged in to reply to a comment');
      return;
    }
    setSelectedArticleId(articleId);
    setParentCommentId(commentId);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 text-center">
          <p className="text-lg">
            Please <Link href="/login" className="text-blue-500 hover:underline">log in</Link> to view news articles and post comments.
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">News</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.description}</p>
              <p className="text-sm text-gray-500">
                Published: {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              {article.author && (
                <p className="text-sm text-gray-500">
                  Author: {article.author.name}
                </p>
              )}
              {article.category && (
                <p className="text-sm text-gray-500">
                  Category: {article.category.name}
                </p>
              )}
              {article.cover && (
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.cover.url}`}
                  alt={article.cover.alternativeText}
                  className="mt-2 max-w-full h-auto"
                />
              )}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Comments</h3>
                {/* Note: Comments not fetched in this example; requires separate endpoint */}
                <form
                  onSubmit={(e) => handleCommentSubmit(e, article.documentId)}
                  className="mt-2 flex flex-col gap-2"
                >
                  <textarea
                    value={selectedArticleId === article.documentId ? commentContent : ''}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder={parentCommentId ? 'Write a reply...' : 'Write a comment...'}
                    className="p-2 border rounded w-full"
                    rows={4}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={!commentContent.trim() || !session}
                  >
                    {parentCommentId ? 'Post Reply' : 'Post Comment'}
                  </button>
                  {parentCommentId && selectedArticleId === article.documentId && (
                    <button
                      type="button"
                      onClick={() => {
                        setParentCommentId(null);
                        setSelectedArticleId(null);
                        setCommentContent('');
                      }}
                      className="text-sm text-gray-500"
                    >
                      Cancel Reply
                    </button>
                  )}
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;