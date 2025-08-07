"use client";

import Image from 'next/image';

const categoryData = {
  politics: {
    title: "Politics & Government",
    stories: [
      {
        title: "Mayor Announces New Infrastructure Plan",
        excerpt: "Multi-million dollar investment in roads and public transportation",
        image: "https://placehold.co/400x300/1f2937/ffffff?text=Politics+News",
        readTime: "4 min read"
      },
      {
        title: "Local Council Votes on Environmental Policy",
        excerpt: "New regulations aim to reduce carbon footprint by 2030",
        image: "https://placehold.co/400x300/059669/ffffff?text=Environment+News",
        readTime: "3 min read"
      }
    ]
  },
  sports: {
    title: "Sports & Recreation",
    stories: [
      {
        title: "Local Team Advances to Championship",
        excerpt: "Historic victory secures spot in regional finals",
        image: "https://placehold.co/400x300/dc2626/ffffff?text=Sports+News",
        readTime: "5 min read"
      },
      {
        title: "New Sports Complex Opens Downtown",
        excerpt: "State-of-the-art facilities now available to community",
        image: "https://placehold.co/400x300/7c3aed/ffffff?text=Sports+Complex",
        readTime: "3 min read"
      }
    ]
  },
  entertainment: {
    title: "Entertainment & Arts",
    stories: [
      {
        title: "Local Film Festival Draws International Attention",
        excerpt: "Independent filmmakers showcase their work to growing audience",
        image: "https://placehold.co/400x300/f59e0b/ffffff?text=Film+Festival",
        readTime: "4 min read"
      },
      {
        title: "Community Theater Announces New Season",
        excerpt: "Diverse lineup includes classic and contemporary productions",
        image: "https://placehold.co/400x300/ec4899/ffffff?text=Theater+News",
        readTime: "3 min read"
      }
    ]
  },
  technology: {
    title: "Technology & Innovation",
    stories: [
      {
        title: "Startup Incubator Launches in Downtown",
        excerpt: "New program supports local tech entrepreneurs",
        image: "https://placehold.co/400x300/0891b2/ffffff?text=Tech+Startup",
        readTime: "4 min read"
      },
      {
        title: "Digital Literacy Program for Seniors",
        excerpt: "Free classes help older adults navigate modern technology",
        image: "https://placehold.co/400x300/059669/ffffff?text=Digital+Literacy",
        readTime: "3 min read"
      }
    ]
  }
};

export default function NewsCategories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(categoryData).map(([key, category]) => (
          <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {category.stories.map((story, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#03A0B4] cursor-pointer">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{story.readTime}</span>
                        <button className="text-[#03A0B4] text-sm font-medium hover:text-[#0284a3]">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="text-[#03A0B4] font-medium hover:text-[#0284a3]">
                  View All {category.title} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 