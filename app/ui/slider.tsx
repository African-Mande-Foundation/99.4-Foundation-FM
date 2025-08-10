'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import {Search, SearchIcon} from 'lucide-react';
import LanguageSearchBar from './searchbar';
import Player from '@/app/ui/player';

const slides = [
  {
    id: 1,
    title: 'Foundation FM 99.4',
    subtitle: 'The voice of Maridi, South Sudan',
    image: '/slider1.jpg',
    align: 'left',
  },
  {
    id: 2,
    title: 'Empowering the Community',
    subtitle: 'News, Music, and More',
    image: '/slider2.jpg',
    align: 'right',
  },
  {
    id: 3,
    title: 'Live Talk Shows',
    subtitle: 'Connecting You Daily',
    image: '/slider3.jpg',
    align: 'left',
  },
];

const transitionTypes = [
  'slideLeft',
  'slideRight',
  'slideUp',
  'slideDown',
  'columnSlice',
  'rowSlice',
  'squareSlice',
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [transitionType, setTransitionType] = useState('slideLeft');
  const [showSlices, setShowSlices] = useState(true);
  const touchStartX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomType = transitionTypes[Math.floor(Math.random() * transitionTypes.length)];
      setTransitionType(randomType);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setShowSlices(true);
    if (['columnSlice', 'rowSlice', 'squareSlice'].includes(transitionType)) {
      const timer = setTimeout(() => setShowSlices(false), 1200);
      return () => clearTimeout(timer);
    } else {
      setShowSlices(true);
    }
  }, [current, transitionType]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) manualSlide(-1);
    else if (diff < -50) manualSlide(1);
  };

  const manualSlide = (dir: number) => {
    const randomType = transitionTypes[Math.floor(Math.random() * transitionTypes.length)];
    setTransitionType(randomType);
    setCurrent((prev) => (prev + dir + slides.length) % slides.length);
  };

  const slide = slides[current];

const getSlideAnimation = () => {
  switch (transitionType) {
    case 'slideLeft':
      return { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '-100%' } };
    case 'slideRight':
      return { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '100%' } };
    case 'slideUp':
      return { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '-100%' } };
    case 'slideDown':
      return { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '100%' } };
    default:
      return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  }
};

 

return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[08D6ED]"
      style={{background: '#08D6ED'}}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Standard Transitions: Animate the image itself for smooth slide */}
      {['slideLeft', 'slideRight', 'slideUp', 'slideDown'].includes(transitionType) ? (
        <AnimatePresence mode="wait" >
          <motion.div
            key={slide.id + transitionType}
            className="absolute inset-0 w-full h-full"
            initial={getSlideAnimation().initial}
            animate={getSlideAnimation().animate}
            exit={getSlideAnimation().exit}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ zIndex: 0 }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
             fill
             style={{ objectFit: 'cover' }}
              className="z-0 object-cover"
              priority
              draggable={false}
              quality={100}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        // For slice transitions, just show the image as background
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          priority
          draggable={false}
          quality={100}
        />
      )}

      {/* Column Slices as animated masks */}
      {transitionType === 'columnSlice' && showSlices && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 left-0 h-full"
              style={{
                left: `${i * 10}%`,
                width: '10%',
                height: '100%',
                background: '#08D6ED', // mask color
                zIndex: 20,
              }}
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut', delay: i * 0.07 }}
            />
          ))}
        </div>
      )}

      {/* Row Slices as animated masks */}
      {transitionType === 'rowSlice' && showSlices && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 w-full"
              style={{
                top: `${i * 16.6667}%`,
                height: '16.6667%',
                width: '100%',
                background: '#08D6ED',
                zIndex: 20,
              }}
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut', delay: i * 0.09 }}
            />
          ))}
        </div>
      )}

      {/* Square Slices as animated masks */}
      {transitionType === 'squareSlice' && showSlices && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(3)].map((_, row) =>
            [...Array(4)].map((_, col) => (
              <motion.div
                key={`${row}-${col}`}
                className="absolute"
                style={{
                  left: `${col * 25}%`,
                  top: `${row * 33.3333}%`,
                  width: '25%',
                  height: '33.3333%',
                  background: '#08D6ED',
                  zIndex: 20,
                }}
                initial={{ scale: 1 }}
                animate={{ scale: 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut', delay: (row * 4 + col) * 0.06 }}
              />
            ))
          )}
        </div>
      )}


      <div className='absolute flex items-center justify-between z-20 top-0 w-full border-0 border-red-500 h-25 bg-transparent'>
        <Image
        src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2FIMG-20220323-WA0012.jpg?alt=media&token=181d64fc-c649-495a-95a9-1ff82a7643ee"
        alt='Logo'
        width={100}
        height={100}
        className='h-25'
        />
        <LanguageSearchBar/>
      </div>

      

      {/* Text Overlay */}
      <div
        className={`hidden lg:block absolute top-1/2 z-30 transform -translate-y-1/2 w-full px-8 md:px-24 text-white h-auto ${
          slide.align === 'left' ? 'text-left' : 'text-right'
        }`}
      >
        <motion.div
          key={slide.title + transitionType}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          
        >
            <h1 className="text-7xl xl:text-8xl">RADIO FM </h1>
            <h1 className="text-7xl xl:text-8xl">WE ARE</h1>
            <h1 className="text-7xl xl:text-8xl">LIVE</h1>
            <p className="text-xl mt-10 mb-10">06:00 - 24:00</p>
            <Link href="#" className='border-2 border-white text-3xl p-2 mb-4'>DONATE NOW</Link>
          
         
        </motion.div>
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-1/2 lg:bottom-25 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              manualSlide(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={classNames(
              'w-3 h-3 rounded-full',
              current === index ? 'bg-white' : 'bg-gray-400'
            )}
          />
        ))}

        
      </div>

      {/* Player */}
        <Player/>
    </div>
  );
}