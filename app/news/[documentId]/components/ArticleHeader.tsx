"use client";

import Image from "next/image";
import { ArticleData } from "@/app/lib/types";

interface ArticleHeaderProps {
  article: ArticleData;
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 text-sm mb-2">
        By {article.author?.name || "Unknown"} on{" "}
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      {article.category && (
        <p className="text-gray-600 text-sm mb-4">
          Category: {article.category.name}
        </p>
      )}
      {article.cover && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={`${article.cover.url}`}
            alt={article.cover.alternativeText || article.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ArticleHeader;
