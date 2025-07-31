'use client';

import { useState, useEffect } from 'react';


type Testimonial = {
  quote: string;
  name: string;
  profession: string;
};


const testimonials: Testimonial[] = [
  {
    quote: "Foundation FM has been a vital source of community news. I love tuning in every day.",
    name: "John Deng",
    profession: "Teacher",
  },
  {
    quote: "Their music selection is top-notch and the shows are always engaging!",
    name: "Mary Atim",
    profession: "Nurse",
  },
  {
    quote: "A refreshing voice in Maridi! Thank you Foundation FM for keeping us informed.",
    name: "Peter Lado",
    profession: "Business Owner",
  },
  // Add more as needed
];

export default function Testimonial () {
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000); 
    return () => clearInterval(interval);
  }, []);


    return(
        <div className="w-full max-w-3xl mx-auto text-center relative">
      <div className="flex flex-col items-center justify-center transition-all duration-500 ease-in-out min-h-[250px]">
        <p className="text-lg italic text-white mb-6">“{testimonials[currentIndex].quote}”</p>
        <p className="text-md font-bold text-[#03A0B4]">{testimonials[currentIndex].name}</p>
        <p className="text-sm text-gray-500">{testimonials[currentIndex].profession}</p>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 border-1 rounded-full ${
              currentIndex === index ? 'border-[#03A0B4]' : 'border-white'
            }`}
          />
        ))}
      </div>
    </div>
    );
}


