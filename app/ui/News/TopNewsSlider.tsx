"use client";

import { useEffect, useState } from 'react';

const topSlides = [
    {
        title: 'News That Informs, Inspires, and Empowers',
        image: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756768.jpg?alt=media&token=e776768b-4691-4347-922d-0af8bf155208'
    },
    {
        title: 'Empowering Communities Through Media',
        image: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756993.jpg?alt=media&token=ecda6a3f-cd2d-4715-85b6-1099632bec55'
    },
    {
        title: 'News That Informs, Inspires, and Empowers',
        image: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-olly-3768709.jpg?alt=media&token=c23fa750-b11a-4057-abac-e3bb2208c3f6'
    }
];

export default function TopNewsSlider () {
    const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % topSlides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + topSlides.length) % topSlides.length);


  return (
    <div className="relative h-[500px] overflow-hidden">
      {topSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold text-center max-w-xl px-4">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
      >
        ›
      </button>
    </div>
  );

}