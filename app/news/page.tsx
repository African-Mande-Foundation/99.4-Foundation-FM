'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NewsItem {
  id: number;
  attributes: {
    title: string;
    content: string;
    publishedAt: string;
  };
}


import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        if (res.ok) {
          setNews(data.data);
        } else {
          setError(data.message || 'Failed to load news');
          router.push('/login');
        }
      } catch (err) {
        setError('An error occurred');
        router.push('/login');
      }
    };
    fetchNews();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

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
        {news.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{item.attributes.title}</h2>
            <p className="text-gray-600">{item.attributes.content}</p>
            <p className="text-sm text-gray-500">
              Published: {new Date(item.attributes.publishedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NewsPage;