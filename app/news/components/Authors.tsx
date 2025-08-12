
'use client';

import Image from 'next/image';
import { Author } from '@/app/lib/types';

interface AuthorsProps {
  authors: Author[];
}

const Authors = ({ authors }: AuthorsProps) => {
  if (!authors) {
    return <p className="col-span-full text-center text-gray-600">No authors found</p>;
  }
  return (
    <div className="p-6 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900  pb-2">Magazine Editors</h2>
      <div className="space-y-3">
        {authors.map((author) => (
          <button
            key={author.id}
            className="flex items-center w-full text-left px-4 py-3 l text-gray-800 hover:bg-gray-100 transition-colors "
          >
            {author.avatar && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${author.avatar.formats.thumbnail.url}`}
                alt={author.name}
                width={36}
                height={36}
                className="rounded-full mr-4 border border-gray-300"
              />
            )}
            <div>
              <p className="font-semibold">{author.name}</p>
              <p className="text-sm text-gray-500">{author.email}</p>
            </div>
          </button>
        ))}
      </div>
    </div>

  );
};

export default Authors;
