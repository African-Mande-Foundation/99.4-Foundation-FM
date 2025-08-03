
'use client';

import { Category, Author, RecentComment } from '@/app/lib/types';
import Categories from './Categories';
import Authors from './Authors';
import SocialMedia from './SocialMedia';
import RecentComments from './RecentComments';

interface SidebarProps {
  categories: Category[];
  authors: Author[];
  recentComments: RecentComment[];
  selectedCategory: string | null;
  onCategoryClick: (slug: string | null) => void;
  onAuthorClick: (authorId: string | null) => void;
}

const Sidebar = ({ categories, authors, recentComments, selectedCategory, onCategoryClick, onAuthorClick }: SidebarProps) => {
  return (
    <div className="lg:w-2/4">
      <Categories categories={categories} selectedCategory={selectedCategory} onCategoryClick={onCategoryClick} />
      <Authors authors={authors} onAuthorClick={onAuthorClick} />
      <SocialMedia />
      <RecentComments recentComments={recentComments} />
    </div>
  );
};

export default Sidebar;
