
'use client';

import Image from 'next/image';
import { Author } from '@/app/lib/types';

interface AuthorsProps {
  authors: Author[];
  onAuthorClick: (authorId: string | null) => void;
}

const Authors = ({ authors, onAuthorClick }: AuthorsProps) => {
  return (
    <div className="p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Magazine Editors</h2>
      <div className="space-y-2">
        {authors.map((author) => (
          <button
            key={author.id}
            onClick={() => onAuthorClick(author.documentId)}
            className="flex items-center w-full text-left px-4 py-2 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            {author.avatar && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${author.avatar.formats.thumbnail.url}`}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            )}
            {author.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Authors;
