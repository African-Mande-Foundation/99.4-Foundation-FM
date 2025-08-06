'use client';

import { Category } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface CategoriesProps {
  categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {
  if(!categories){
    return  <p className="col-span-full text-center text-gray-600">Loading articles...</p>;
  }
  return (
    <div className="w-full p-6 mb-8 border-t-8 border-b-8 border-black  ">
      <h2 className="text-3xl font-bold mb-6 text-gray-900  pb-2">Posts from Categories</h2>

      <div className="space-y-1">
        {categories.map((category) => (
          <Link key={category.id} href={`/news/category/${category.slug}`} passHref>
            <div
              className={`w-full mb-5 text-left flex flex-col md:flex-row gap-4 items-start p-4 rounded-lg transition cursor-pointer
                hover:bg-gray-100 transition-colors bg-white`}
            >
              {category.cover && (
                <div className="relative w-full md:w-28 h-24 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${category.cover.formats.thumbnail.url}`}
                    alt={category.name}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-black mb-2">{category.name}</h3>
                <p className="text-gray-700 text-sm">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
