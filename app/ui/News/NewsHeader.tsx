"use client";

import { useState, useEffect } from 'react';

const breakingNews = [
  "BREAKING: Local community leaders announce new youth initiative",
  "URGENT: Weather alert for coastal regions",
  "LATEST: Foundation FM launches new podcast series",
  "UPDATE: Community center reopening after renovations"
];

export default function NewsHeader() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#03A0B4] text-white">
      {/* Breaking News Ticker */}
      <div className="bg-[#0284a3] py-2 px-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm">BREAKING:</span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap">
              {breakingNews[currentNewsIndex]}
            </div>
          </div>
        </div>
      </div>

      {/* News Categories Navigation */}
      <div className="bg-white text-gray-800 py-3 px-4">
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Home</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Politics</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Community</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Health</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Education</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Sports</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Entertainment</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Technology</a>
          <a href="#" className="hover:text-[#03A0B4] transition-colors">Opinion</a>
        </div>
      </div>
    </div>
  );
} 