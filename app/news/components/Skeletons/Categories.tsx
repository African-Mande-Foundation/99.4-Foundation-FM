'use client';

const CategoriesSkeleton = () => {
  return (
    <div className="w-full p-6 mb-8 border-t-8 border-b-8 border-black animate-pulse">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 pb-2">Posts from Categories</h2>
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-full flex flex-col md:flex-row gap-4 items-start p-4 bg-white rounded-lg"
          >
            <div className="w-full md:w-28 h-24 bg-gray-300 rounded-md" />
            <div className="flex flex-col space-y-2 flex-1">
              <div className="w-1/2 h-4 bg-gray-300 rounded" />
              <div className="w-full h-3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
