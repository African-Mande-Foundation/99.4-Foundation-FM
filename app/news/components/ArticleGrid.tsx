"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/lib/types";

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  if (!articles) {
    return (
      <p className="col-span-full text-center text-gray-600">
        No articles found
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.documentId}`}
            className="group"
          >
            <div className=" overflow-hidden shadow-sm hover:shadow-lg transition duration-300 border border-gray-200 bg-white">
              {/* Cover Image */}
              {article.cover && (
                <div className="relative w-full h-64">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.cover.url}`}
                    alt={article.cover.alternativeText || article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-5 space-y-2">
                <h2 className="text-2xl font-bold text-gray-800 line-clamp-2 group-hover:text-[#026C79] transition-colors">
                  {article.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.excerpt}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {article.author?.name ? `By ${article.author.name}` : ""}
                  {article.author?.name && article.category?.name ? " · " : ""}
                  {article.category?.name || ""}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-600">
          No articles found.
        </p>
      )}
    </div>
  );
};

export default ArticleGrid;
