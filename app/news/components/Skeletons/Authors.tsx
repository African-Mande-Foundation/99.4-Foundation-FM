'use client';

const AuthorsSkeleton = () => {
  return (
    <div className="p-6 mb-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="w-9 h-9 bg-gray-300 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="w-32 h-3 bg-gray-300 rounded" />
              <div className="w-24 h-3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsSkeleton;
