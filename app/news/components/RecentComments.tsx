'use client';

import Image from 'next/image';
import { RecentComment } from '@/app/lib/types';

interface RecentCommentsProps {
  recentComments: RecentComment[];
}

const RecentComments = ({ recentComments }: RecentCommentsProps) => {

  if (!recentComments) {
    return <p className="col-span-full text-center text-gray-600">Loading comments...</p>;
  }
  return (
    <div className="p-6  border-t-8  border-black">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2">Latest Comments</h2>

      {recentComments.length > 0 ? (
        <div className="space-y-6 ">
          {recentComments.map((comment) => (
            <div key={comment.id} className="space-y-3 ">


              <div className="relative bg-gray-200 p-4  text-sm text-gray-800 max-w-xl">

                <div className="absolute bottom-0 left-1/17 -translate-x-1/2 translate-y-full w-0 h-0 
                  border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-200">
                </div>

                <p>{comment.Content}</p>
              </div>
              <div className="flex items-center space-x-3">
                {comment.user?.photoUrl && (
                  <Image
                    src={comment.user.photoUrl}
                    alt={comment.user.username || 'User'}
                    width={30}
                    height={30}
                    className="rounded-full object-cover"
                  />
                )}
                <p className="text-xs text-gray-500 font-medium">
                {comment.user?.username || 'Anonymous'}

              </p>
            </div>
            </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 text-sm">No recent comments.</p>
  )
}
    </div >
  );
};

export default RecentComments;
