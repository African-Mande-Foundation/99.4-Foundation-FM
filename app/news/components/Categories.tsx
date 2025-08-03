
'use client';

import { Category } from '@/app/lib/types';

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryClick: (slug: string | null) => void;
}

const Categories = ({ categories, selectedCategory, onCategoryClick }: CategoriesProps) => {
  return (
    <div className="p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Posts from Categories</h2>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryClick(null)}
          className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${!selectedCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.slug)}
            className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === category.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
