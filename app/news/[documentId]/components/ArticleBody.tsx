"use client";

import { ArticleData } from "@/app/lib/types";

interface ArticleBodyProps {
  article: ArticleData;
}

const ArticleBody = ({ article }: ArticleBodyProps) => {
  return (
    <div
      className="prose max-w-none mb-8"
      dangerouslySetInnerHTML={{ __html: article.description }}
    />
  );
};

export default ArticleBody;
