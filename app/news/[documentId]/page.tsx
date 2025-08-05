
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/app/ui/Navbar';
import Footer from '@/app/ui/Footer';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArticleData } from '@/app/lib/types';
import ArticleHeader from './components/ArticleHeader';
import ArticleBody from './components/ArticleBody';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import LoadingBar from '@/app/ui/LoadingBar';

export default function ArticlePage() {
  const params = useParams<{ documentId: string }>();
  const { documentId } = params;
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

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

  useEffect(() => {
    fetchArticle();
  }, [documentId]);

  const handleCommentPosted = () => {
    setParentCommentId(null);
    fetchArticle();
  };

  const handleReplyClick = (commentId: string) => {
    if (!session) {
      setError('You must be logged in to reply to a comment');
      return;
    }
    setParentCommentId(commentId);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingBar />;
        <Footer />
      </>
    )
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
        <button onClick={() => router.back()} className="mb-4 text-blue-500 hover:underline">
          &larr; Back
        </button>
        <ArticleHeader article={article} />
        <ArticleBody article={article} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {session ? (
            <CommentForm
              articleId={documentId}
              userId={session.user?.id}
              parentId={parentCommentId}
              onCommentPosted={handleCommentPosted}
            />
          ) : (
            <p className="text-center text-gray-600 mb-8">
              Please <Link href="/login" className="text-blue-500 hover:underline">log in</Link> to post comments.
            </p>
          )}

          <CommentList comments={article.comments} onReplyClick={handleReplyClick} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

