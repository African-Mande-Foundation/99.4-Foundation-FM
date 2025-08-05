"use client";

import Image from 'next/image';

const popularArticles = [
  {
    title: "Community Garden Project Celebrates First Harvest",
    views: "2.3K views",
    image: "https://placehold.co/100x100/059669/ffffff?text=Garden"
  },
  {
    title: "Local Restaurant Named Best in Region",
    views: "1.8K views",
    image: "https://placehold.co/100x100/dc2626/ffffff?text=Restaurant"
  },
  {
    title: "New Library Branch Opens in West District",
    views: "1.5K views",
    image: "https://placehold.co/100x100/0891b2/ffffff?text=Library"
  },
  {
    title: "Youth Soccer League Registration Now Open",
    views: "1.2K views",
    image: "https://placehold.co/100x100/7c3aed/ffffff?text=Soccer"
  },
  {
    title: "Local Artist Wins Regional Competition",
    views: "980 views",
    image: "https://placehold.co/100x100/f59e0b/ffffff?text=Artist"
  }
];

const weatherData = {
  current: "72°F",
  condition: "Partly Cloudy",
  high: "78°F",
  low: "65°F"
};

const socialFeeds = [
  {
    platform: "Twitter",
    handle: "@FoundationFM",
    followers: "12.5K",
    latest: "Breaking: New community center opening next month! 🎉 #CommunityNews"
  },
  {
    platform: "Facebook",
    handle: "Foundation FM",
    followers: "8.2K",
    latest: "Join us for our weekly radio show every Sunday at 2 PM"
  },
  {
    platform: "Instagram",
    handle: "@foundationfm",
    followers: "15.3K",
    latest: "Behind the scenes at our latest community event 📸"
  }
];

export default function NewsSidebar() {
  return (
    <div className="space-y-6">
      {/* Popular Articles */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Most Popular</h3>
        <div className="space-y-4">
          {popularArticles.map((article, index) => (
            <div key={index} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[#03A0B4] cursor-pointer">
                  {article.title}
                </h4>
                <span className="text-xs text-gray-500">{article.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Local Weather</h3>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{weatherData.current}</div>
          <div className="text-lg mb-4">{weatherData.condition}</div>
          <div className="flex justify-center space-x-4 text-sm">
            <span>H: {weatherData.high}</span>
            <span>L: {weatherData.low}</span>
          </div>
        </div>
      </div>

      {/* Social Media Feeds */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Social Media</h3>
        <div className="space-y-4">
          {socialFeeds.map((feed, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-900">{feed.platform}</span>
                <span className="text-xs text-gray-500">@{feed.handle}</span>
                <span className="text-xs text-gray-500">• {feed.followers}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{feed.latest}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-[#03A0B4] rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-sm mb-4 opacity-90">
          Get the latest news delivered to your inbox
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded text-gray-900 text-sm"
          />
          <button className="w-full bg-white text-[#03A0B4] px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-900">Quick Links</h3>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-gray-600 hover:text-[#03A0B4]">Contact Us</a>
          <a href="#" className="block text-sm text-gray-600 hover:text-[#03A0B4]">About Foundation FM</a>
          <a href="#" className="block text-sm text-gray-600 hover:text-[#03A0B4]">Advertise</a>
          <a href="#" className="block text-sm text-gray-600 hover:text-[#03A0B4]">Privacy Policy</a>
          <a href="#" className="block text-sm text-gray-600 hover:text-[#03A0B4]">Terms of Service</a>
        </div>
      </div>
    </div>
  );
} 