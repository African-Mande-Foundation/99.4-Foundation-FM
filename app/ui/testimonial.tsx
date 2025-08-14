'use client';

import { useState, useEffect } from 'react';

type TestimonialType = {
  id: number;
  quote: string;
  name: string;
  profession: string;
};

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch testimonials from API on mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) {
    return <p className="text-white text-center">No testimonials found.</p>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto text-center relative">
      <div className="flex flex-col items-center justify-center transition-all duration-500 ease-in-out min-h-[250px]">
        <p className="text-lg italic text-white mb-6">
          “{testimonials[currentIndex].quote}”
        </p>
        <p className="text-md font-bold text-[#03A0B4]">
          {testimonials[currentIndex].name}
        </p>
        <p className="text-sm text-gray-500">
          {testimonials[currentIndex].profession}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 border-2 rounded-full ${
              currentIndex === index ? 'border-[#03A0B4]' : 'border-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
