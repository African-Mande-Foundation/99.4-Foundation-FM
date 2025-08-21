"use client";
import { useEffect, useState } from "react";

const FullScreenLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 100));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex flex-col items-center justify-center bg-[#1b1b1b]">
      <div className="w-16 h-16 border-4 border-[#026C79] border-t-transparent rounded-full animate-spin mb-8"></div>
      <div className="w-2/3 max-w-lg h-1 bg-[#222] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-[#03A0B4] to-[#026C79] transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-white text-lg font-semibold">Loading... {progress}%</span>
    </div>
  );
};

export default FullScreenLoader;