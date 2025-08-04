'use client';

const ArticleGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="overflow-hidden shadow-sm border border-gray-200 bg-white animate-pulse">
          <div className="relative w-full h-64 bg-gray-200" />

          <div className="p-5 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleGridSkeleton;
