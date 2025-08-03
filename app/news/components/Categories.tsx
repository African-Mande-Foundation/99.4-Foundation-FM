'use client';

import { Category } from '@/app/lib/types';
import Image from 'next/image';

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryClick: (slug: string | null) => void;
}

const Categories = ({ categories, selectedCategory, onCategoryClick }: CategoriesProps) => {
  return (
    <div className="w-full p-6 mb-8 border-t-8 border-b-8 border-black  ">
      <h2 className="text-3xl font-bold mb-6 text-gray-900  pb-2">Posts from Categories</h2>

      <div className="space-y-6">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.slug;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.slug)}
              className={`w-full text-left flex flex-col md:flex-row gap-4 items-start p-4 rounded-lg transition 
                hover:shadow-lg ${isSelected ? 'bg-green-300' : 'bg-white'}`}
            >
              {category.cover && (
                <div className="relative w-full md:w-28 h-24 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${category.cover.formats.thumbnail.url}`}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-black mb-2">{category.name}</h3>
                <p className="text-gray-700 text-sm">{category.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
