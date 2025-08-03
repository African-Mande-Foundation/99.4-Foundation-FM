
'use client';

import Image from 'next/image';
import { RecentComment } from '@/app/lib/types';

interface RecentCommentsProps {
  recentComments: RecentComment[];
}

const RecentComments = ({ recentComments }: RecentCommentsProps) => {
  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Latest Comments</h2>
      {recentComments.length > 0 ? (
        <div className="space-y-4">
          {recentComments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center mb-2">
                {comment.profile?.photoUrl && (
                  <Image
                    src={comment.profile.photoUrl}
                    alt={comment.profile.name || 'User'}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                )}
                <p className="font-semibold text-sm text-gray-800">{comment.profile?.name || 'Anonymous'}</p>
              </div>
              <p className="text-gray-700 text-sm line-clamp-3">{comment.Content}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-sm">No recent comments.</p>
      )}
    </div>
  );
};

export default RecentComments;
