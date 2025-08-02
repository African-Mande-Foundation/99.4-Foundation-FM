'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import Image from 'next/image';

import { Article, Category, RecentComment } from '@/app/lib/types';

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentComments, setRecentComments] = useState<RecentComment[]>([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const fetchArticles = async (query = '', categorySlug: string | null = null) => {
    try {
      let url = '/api/articles';
      const params = new URLSearchParams();

      if (query) {
        params.append('filters[title][$containsi]', query);
      }
      if (categorySlug) {
        params.append('filters[category][slug][$eq]', categorySlug);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
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

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (res.ok) {
        setCategories(data.data);
      } else {
        setError(data.message || 'Failed to load categories');
      }
    } catch (err) {
      setError('An error occurred while loading categories');
    }
  };

  const fetchRecentComments = async () => {
    try {
      const res = await fetch('/api/recent-comments');
      const data = await res.json();
      if (res.ok) {
        setRecentComments(data.data);
      } else {
        setError(data.message || 'Failed to load recent comments');
      }
    } catch (err) {
      setError('An error occurred while loading recent comments');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchArticles();
      fetchCategories();
      fetchRecentComments();
    }
  }, [status]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles(searchQuery, selectedCategory);
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    fetchArticles(searchQuery, slug);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-800">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="max-w-4xl mx-auto mt-10 text-center py-8">
          <p className="text-lg">
            Please <Link href="/login" className="text-blue-500 hover:underline">log in</Link> to view news articles.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Latest News</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-grow lg:w-3/4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Categories */}
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  fetchArticles(searchQuery, null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium ${!selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.slug
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <Link key={article.id} href={`/news/${article.documentId}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200">
                      {article.cover && (
                        <div className="relative w-full h-48">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.cover.url}`}
                            alt={article.cover.alternativeText || article.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
                        <p className="text-gray-600 text-sm line-clamp-3">{article.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {article.author?.name ? `By ${article.author.name}` : ''}
                          {article.author?.name && article.category?.name ? ' in ' : ''}
                          {article.category?.name || ''}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">No articles found.</p>
              )}
            </div>
          </div>

          {/* Sidebar for Recent Comments */}
          <div className="lg:w-1/4 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Recent Comments</h2>
            {recentComments.length > 0 ? (
              <div className="space-y-4">
                {recentComments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      {comment.profile?.photoUrl && (
                        <Image
                          src={comment.profile.photoUrl}
                          alt={comment.profile.name || 'User'}
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                      )}
                      <p className="font-semibold text-sm text-gray-800">{comment.profile?.name || 'Anonymous'}</p>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-3">{comment.Content}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No recent comments.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;