'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSlider, setShowSlider] = useState(false);

  const photos: Photo[] = [
    // Events Category
    { id: 1, src: "/slider1.jpg", alt: "Community Event 1", title: "Annual Community Festival", category: "events" },
    { id: 2, src: "/slider2.jpg", alt: "Community Event 2", title: "Radio Launch Party", category: "events" },
    { id: 3, src: "/slider3.jpg", alt: "Community Event 3", title: "Foundation FM Anniversary", category: "events" },
    { id: 4, src: "/slider1.jpg", alt: "Community Event 4", title: "Community Outreach Day", category: "events" },
    { id: 5, src: "/slider2.jpg", alt: "Community Event 5", title: "Local Talent Show", category: "events" },
    { id: 6, src: "/slider3.jpg", alt: "Community Event 6", title: "Radio Station Opening", category: "events" },
    { id: 7, src: "/slider1.jpg", alt: "Community Event 7", title: "Community Awards Night", category: "events" },
    { id: 8, src: "/slider2.jpg", alt: "Community Event 8", title: "Foundation FM Fundraiser", category: "events" },
    { id: 9, src: "/slider3.jpg", alt: "Community Event 9", title: "Community Radio Day", category: "events" },
    { id: 10, src: "/slider1.jpg", alt: "Community Event 10", title: "Local Music Festival", category: "events" },
    { id: 11, src: "/slider2.jpg", alt: "Community Event 11", title: "Radio Station Tour", category: "events" },
    { id: 12, src: "/slider3.jpg", alt: "Community Event 12", title: "Community Celebration", category: "events" },

    // Youth Programs Category
    { id: 13, src: "/slider2.jpg", alt: "Youth Program 1", title: "Youth Radio Training", category: "youth" },
    { id: 14, src: "/slider3.jpg", alt: "Youth Program 2", title: "Teen DJ Workshop", category: "youth" },
    { id: 15, src: "/slider1.jpg", alt: "Youth Program 3", title: "Young Voices Program", category: "youth" },
    { id: 16, src: "/slider2.jpg", alt: "Youth Program 4", title: "Youth Leadership Camp", category: "youth" },
    { id: 17, src: "/slider3.jpg", alt: "Youth Program 5", title: "Teen Talk Show", category: "youth" },
    { id: 18, src: "/slider1.jpg", alt: "Youth Program 6", title: "Youth Media Training", category: "youth" },
    { id: 19, src: "/slider2.jpg", alt: "Youth Program 7", title: "Young Journalists", category: "youth" },
    { id: 20, src: "/slider3.jpg", alt: "Youth Program 8", title: "Teen Radio Hour", category: "youth" },
    { id: 21, src: "/slider1.jpg", alt: "Youth Program 9", title: "Youth Empowerment Day", category: "youth" },
    { id: 22, src: "/slider2.jpg", alt: "Youth Program 10", title: "Young Talent Showcase", category: "youth" },
    { id: 23, src: "/slider3.jpg", alt: "Youth Program 11", title: "Teen Community Service", category: "youth" },
    { id: 24, src: "/slider1.jpg", alt: "Youth Program 12", title: "Youth Radio Station", category: "youth" },

    // Studio Category
    { id: 25, src: "/slider3.jpg", alt: "Studio Session 1", title: "Live Radio Recording", category: "studio" },
    { id: 26, src: "/slider1.jpg", alt: "Studio Session 2", title: "Podcast Production", category: "studio" },
    { id: 27, src: "/slider2.jpg", alt: "Studio Session 3", title: "Music Recording Session", category: "studio" },
    { id: 28, src: "/slider3.jpg", alt: "Studio Session 4", title: "Interview Recording", category: "studio" },
    { id: 29, src: "/slider1.jpg", alt: "Studio Session 5", title: "Sound Engineering", category: "studio" },
    { id: 30, src: "/slider2.jpg", alt: "Studio Session 6", title: "Live Broadcast", category: "studio" },
    { id: 31, src: "/slider3.jpg", alt: "Studio Session 7", title: "Equipment Setup", category: "studio" },
    { id: 32, src: "/slider1.jpg", alt: "Studio Session 8", title: "Studio Tour", category: "studio" },
    { id: 33, src: "/slider2.jpg", alt: "Studio Session 9", title: "Audio Production", category: "studio" },
    { id: 34, src: "/slider3.jpg", alt: "Studio Session 10", title: "Radio Show Recording", category: "studio" },
    { id: 35, src: "/slider1.jpg", alt: "Studio Session 11", title: "Studio Equipment", category: "studio" },
    { id: 36, src: "/slider2.jpg", alt: "Studio Session 12", title: "Professional Recording", category: "studio" },

    // Education Category
    { id: 37, src: "/slider1.jpg", alt: "Education Program 1", title: "Media Literacy Workshop", category: "education" },
    { id: 38, src: "/slider2.jpg", alt: "Education Program 2", title: "Journalism Training", category: "education" },
    { id: 39, src: "/slider3.jpg", alt: "Education Program 3", title: "Digital Media Course", category: "education" },
    { id: 40, src: "/slider1.jpg", alt: "Education Program 4", title: "Communication Skills", category: "education" },
    { id: 41, src: "/slider2.jpg", alt: "Education Program 5", title: "Broadcasting Training", category: "education" },
    { id: 42, src: "/slider3.jpg", alt: "Education Program 6", title: "Media Production Class", category: "education" },
    { id: 43, src: "/slider1.jpg", alt: "Education Program 7", title: "Public Speaking Workshop", category: "education" },
    { id: 44, src: "/slider2.jpg", alt: "Education Program 8", title: "Storytelling Course", category: "education" },
    { id: 45, src: "/slider3.jpg", alt: "Education Program 9", title: "Digital Storytelling", category: "education" },
    { id: 46, src: "/slider1.jpg", alt: "Education Program 10", title: "Media Ethics Training", category: "education" },
    { id: 47, src: "/slider2.jpg", alt: "Education Program 11", title: "Community Journalism", category: "education" },
    { id: 48, src: "/slider3.jpg", alt: "Education Program 12", title: "Media Skills Development", category: "education" }
  ];

  const categories = [
    { 
      id: 'events', 
      name: 'Events', 
      bgImage: "/slider1.jpg",
      count: photos.filter(p => p.category === 'events').length 
    },
    { 
      id: 'youth', 
      name: 'Youth Programs', 
      bgImage: "/slider2.jpg",
      count: photos.filter(p => p.category === 'youth').length 
    },
    { 
      id: 'studio', 
      name: 'Studio', 
      bgImage: "/slider3.jpg",
      count: photos.filter(p => p.category === 'studio').length 
    },
    { 
      id: 'education', 
      name: 'Education', 
      bgImage: "/slider1.jpg",
      count: photos.filter(p => p.category === 'education').length 
    }
  ];

  const filteredPhotos = selectedCategory 
    ? photos.filter(photo => photo.category === selectedCategory)
    : [];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowSlider(true);
  };

  const handleBackToGrid = () => {
    setShowSlider(false);
    setSelectedCategory(null);
  };

  if (showSlider) {
    return (
      <div className="w-full mb-20 flex justify-center">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden h-full w-full max-w-7xl shadow-2xl">
          {/* Back Button */}
          <button
            onClick={handleBackToGrid}
            className="absolute top-8 left-8 z-20 bg-white/10 hover:bg-[#03A0B4] text-white px-6 py-3 transition-all duration-300 backdrop-blur-sm "
          >
            ← Back to Gallery
          </button>

          {/* Category Title */}
          <div className="absolute top-8 right-8 z-20 text-white text-2xl font-bold bg-black/20 px-6 py-3 backdrop-blur-sm border border-white/20">
            {categories.find(c => c.id === selectedCategory)?.name}
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            navigation={true}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + ' bg-white/50 hover:bg-white"></span>';
              }
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
            className="h-full [&_.swiper-button-next]:top-1/2 [&_.swiper-button-prev]:top-1/2 [&_.swiper-pagination]:bottom-4"
            style={{
              '--swiper-navigation-size': '24px',
              '--swiper-navigation-color': '#ffffff',
              '--swiper-pagination-color': '#ffffff',
            } as React.CSSProperties}
          >
            {filteredPhotos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-80 md:h-96 lg:h-100 xl:h-110"
                >
                  <div className="relative w-full h-full  overflow-hidden shadow-2xl">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-bold text-lg mb-2">{photo.title}</h3>
                      <p className="text-sm opacity-90 capitalize">{photo.category}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-20">
      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(category.id)}
            className="relative h-80 overflow-hidden cursor-pointer group shadow-2xl"
          >
            <div className="absolute inset-0">
              <Image
                src={category.bgImage}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-all duration-500" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
              <h3 className="text-3xl font-bold mb-3">{category.name}</h3>
              <p className="text-xl opacity-90 mb-6">{category.count} photos</p>
              <div className="px-8 py-3 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-all duration-300">
                Click to view gallery
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
