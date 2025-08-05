"use client";

import Image from 'next/image';

const featuredStories = [
  {
    id: 1,
    title: "Community Leaders Launch New Youth Empowerment Program",
    excerpt: "Local organizations join forces to provide mentorship and skills training for young people in underserved neighborhoods.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Community+News",
    category: "Community",
    readTime: "5 min read",
    isMain: true
  },
  {
    id: 2,
    title: "New Health Initiative Targets Mental Wellness",
    excerpt: "Foundation FM partners with healthcare providers to address mental health challenges in the community.",
    image: "https://placehold.co/400x300/dc2626/ffffff?text=Health+News",
    category: "Health",
    readTime: "3 min read",
    isMain: false
  },
  {
    id: 3,
    title: "Education Reform Bill Passes Local Council",
    excerpt: "Proposed changes to school funding and curriculum receive overwhelming support from community members.",
    image: "https://placehold.co/400x300/059669/ffffff?text=Education+News",
    category: "Education",
    readTime: "4 min read",
    isMain: false
  },
  {
    id: 4,
    title: "Local Business District Sees Record Growth",
    excerpt: "New shops and restaurants opening as economic recovery continues across the region.",
    image: "https://placehold.co/400x300/7c3aed/ffffff?text=Business+News",
    category: "Business",
    readTime: "3 min read",
    isMain: false
  }
];

const trendingStories = [
  { title: "Weather Alert: Heavy Rain Expected This Weekend", category: "Weather" },
  { title: "New Park Opening Ceremony This Saturday", category: "Community" },
  { title: "Local Artist Exhibition Draws Large Crowds", category: "Arts" },
  { title: "Sports Team Wins Regional Championship", category: "Sports" },
  { title: "Tech Startup Receives Major Investment", category: "Technology" }
];

export default function MainNewsGrid() {
  const mainStory = featuredStories.find(story => story.isMain);
  const sideStories = featuredStories.filter(story => !story.isMain);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Featured Story */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-80">
              <Image
                src={mainStory?.image || ""}
                alt={mainStory?.title || "News story"}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#03A0B4] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {mainStory?.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-3 text-gray-900">
                {mainStory?.title}
              </h1>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {mainStory?.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{mainStory?.readTime}</span>
                <button className="bg-[#03A0B4] text-white px-4 py-2 rounded hover:bg-[#0284a3] transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Stories */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {sideStories.slice(0, 2).map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
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
        </div>

        {/* Trending Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Trending Now</h3>
            <div className="space-y-4">
              {trendingStories.map((story, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#03A0B4] cursor-pointer">
                        {story.title}
                      </h4>
                      <span className="text-xs text-gray-500">{story.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 