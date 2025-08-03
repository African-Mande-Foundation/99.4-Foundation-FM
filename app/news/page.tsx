
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

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [recentComments, setRecentComments] = useState<RecentComment[]>([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const fetchArticles = async (query = '', categorySlug: string | null = null, authorId: string | null = null) => {
    try {
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
    if (status === 'authenticated') {
      fetchArticles();
      fetchCategories();
      fetchAuthors();
      fetchRecentComments();
    }
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
      <ImageSlider />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 max-w-7xl mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow lg:w-3/4">
            <SearchBar onSearch={handleSearch} />
            <ArticleGrid articles={articles} />
          </div>
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
      <Footer />
    </div>
  );
};

export default NewsPage;
