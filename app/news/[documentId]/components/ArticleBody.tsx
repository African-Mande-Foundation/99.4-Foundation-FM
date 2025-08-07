
'use client';

import { ArticleData } from '@/app/lib/types';

interface ArticleBodyProps {
  article: ArticleData;
}

const ArticleBody = ({ article }: ArticleBodyProps) => {
  return (
    <div className="prose max-w-none mb-8">
      <p>{article.description}</p>

    </div>
  );
};

export default ArticleBody;
