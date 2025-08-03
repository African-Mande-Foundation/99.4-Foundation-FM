
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import SearchBar from './components/SearchBar';
import ArticleGrid from './components/ArticleGrid';
import Sidebar from './components/Sidebar';
import LoadingBar from '../ui/LoadingBar';
import ImageSlider from './components/ImageSlider';
import { Article, Category, RecentComment, Author } from '@/app/lib/types';
import InfoCards from './components/InfoCards';
import PeaceAndSocialIssues from './components/Peace&SocialIssues';
import CommunityHighlights from './components/CommunityHighlight';
import LatestPosts from './components/LatestPosts';
import RealVoicesComponent from './components/RealVoice';

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [recentComments, setRecentComments] = useState<RecentComment[]>([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);


  const fetchArticles = async (query = '', categorySlug: string | null = null, authorId: string | null = null) => {
    try {
      setIsLoading(true);
      let url = '/api/articles';
      const params = new URLSearchParams();

      if (query) {
        params.append('filters[title][$containsi]', query);
      }
      if (categorySlug) {
        params.append('filters[category][slug][$eq]', categorySlug);
      }
      if (authorId) {
        params.append('filters[author][id][$eq]', authorId);
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
    finally {
      setIsLoading(false);
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

  const fetchAuthors = async () => {
    try {
      const res = await fetch('/api/authors');
      const data = await res.json();
      if (res.ok) {
        setAuthors(data.data);
      } else {
        setError(data.message || 'Failed to load authors');
      }
    } catch (err) {
      setError('An error occurred while loading authors');
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
    if (status !== 'authenticated') return;

    const fetchAll = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchArticles(),
        fetchCategories(),
        fetchAuthors(),
        fetchRecentComments()
      ]);
      setIsLoading(false);
    };

    fetchAll();
  }, [status]);

  const handleSearch = (query: string) => {
    fetchArticles(query, selectedCategory, selectedAuthor);
  };

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
    fetchArticles('', slug, selectedAuthor);
  };

  const handleAuthorClick = (authorId: string | null) => {
    setSelectedAuthor(authorId);
    fetchArticles('', selectedCategory, authorId);
  };

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <LoadingBar />
        <Footer />
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <Navbar />
        <div className="h-[95vh] flex items-center justify-center px-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Welcome to Foundation FM News
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Please log in to access the latest stories and updates.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 border border-black rounded-full text-sm md:text-base font-medium hover:bg-black hover:text-white transition"
            >
              Log In
            </Link>
            <p className="text-lg md:text-xl text-gray-600">
              New here? Create an account to stay updated.
            </p>
            <Link
              href="/register"
              className="inline-block px-6 py-3 border border-black rounded-full text-sm md:text-base font-medium hover:bg-black hover:text-white transition"
            >
              Register
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <ImageSlider />
      <InfoCards />

      {isLoading && <LoadingBar />}

      <div className="pt-20 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto py-8 ">
        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Main Content */}
          <div className="flex-grow w-full lg:w-2/3 xl:w-3/4">
            <PeaceAndSocialIssues />
            <CommunityHighlights />
            <LatestPosts />
            <ArticleGrid articles={articles} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-2/3 xl:w-1/3">
            <Sidebar
              categories={categories}
              authors={authors}
              recentComments={recentComments}
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
              onAuthorClick={handleAuthorClick}
            />
          </div>
        </div>
        <RealVoicesComponent />

      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;
