
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/lib/types';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  return (
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
  );
};

export default ArticleGrid;
