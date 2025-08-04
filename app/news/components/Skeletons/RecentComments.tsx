'use client';

const RecentCommentsSkeleton = () => {
  return (
    <div className="p-6 border-t-8 border-black animate-pulse">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2">Latest Comments</h2>

      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="space-y-3">
            <div className="relative bg-gray-200 rounded p-4 max-w-xl">
              <div className="absolute bottom-0 left-1/17 -translate-x-1/2 translate-y-full w-0 h-0 
                border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-200" />
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="h-3 w-24 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCommentsSkeleton;
