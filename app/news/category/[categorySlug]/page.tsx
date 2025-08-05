'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Navbar from '@/app/ui/Navbar';
import Footer from '@/app/ui/Footer';
import ArticleGrid from '@/app/news/components/ArticleGrid';
import LoadingBar from '@/app/ui/LoadingBar';
import { Article } from '@/app/lib/types';
import ArticleGridSkeleton from '../../components/Skeletons/ArticleGrid';

const PAGE_SIZE = 10;

const CategoryPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const params = useParams();
  const categorySlug = params.categorySlug as string;

  useEffect(() => {
    if (status !== 'authenticated' || !categorySlug) return;

    const fetchArticlesByCategory = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/articles/category/${categorySlug}?page=${page}&pageSize=${PAGE_SIZE}`
        );
        const data = await res.json();
        if (res.ok) {
          setArticles(data.data);
          setPageCount(data.meta.pagination.pageCount);
        } else {
          setError(data.message || 'Failed to load articles');
        }
      } catch (err) {
        setError('An error occurred while loading articles');
      }
      setIsLoading(false);
    };

    fetchArticlesByCategory();
  }, [status, categorySlug, page]);

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <LoadingBar />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <div className="pt-20 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Category: {categorySlug}</h1>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <ArticleGridSkeleton />
        ) : (
          <>
            <ArticleGrid articles={articles} />
            {pageCount > 1 && (
              <div className="mt-10 flex justify-center items-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xl">←</span> Previous
                </button>

                <span className="px-4 py-2 text-base font-semibold text-gray-800 bg-gray-100 rounded-xl shadow">
                  Page {page} of {pageCount}
                </span>

                <button
                  disabled={page === pageCount}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <span className="text-xl">→</span>
                </button>
              </div>
            )}

          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
