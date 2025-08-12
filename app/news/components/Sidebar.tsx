
'use client';

import { Category, Author, RecentComment } from '@/app/lib/types';
import Categories from './Categories';
import Authors from './Authors';
import SocialMedia from './SocialMedia';
import RecentComments from './RecentComments';

import CategoriesSkeleton from "./Skeletons/Categories";
import AuthorsSkeleton from './Skeletons/Authors';
import RecentCommentsSkeleton from './Skeletons/RecentComments';

interface SidebarProps {
  categories: Category[];
  authors: Author[];
  recentComments: RecentComment[];
  isLoading: boolean;
}

const Sidebar = ({
  categories,
  authors,
  recentComments,
  isLoading,
}: SidebarProps) => {
  return (
    <div className="space-y-6">
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <Categories categories={categories} />
      )}

      {isLoading ? (
        <AuthorsSkeleton />
      ) : (
        <Authors authors={authors} />
      )}

      <SocialMedia />

      {isLoading ? (
        <RecentCommentsSkeleton />
      ) : (
        <RecentComments recentComments={recentComments} />
      )}
    </div>
  );
};

export default Sidebar;