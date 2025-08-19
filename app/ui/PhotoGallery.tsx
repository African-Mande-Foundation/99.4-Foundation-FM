'use client';

import { useState, useEffect } from 'react';
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

interface Category {
  id: string;
  name: string;
  bgImage: string;
  count: number;
}

interface RawCategory {
  id: number;
  name?: string;
  slug?: string;
  attributes?: {
    name?: string;
    slug?: string;
    cover?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
  };
  backgroundImage?: {
    url?: string;
  };
}

interface RawPhoto {
  id: number;
  alt?: string;
  title?: string;
  category?: {
    slug?: string;
  };
  image?: {
    url?: string;
  };
}

const getStrapiMedia = (url?: string) => {
  if (!url) return "/placeholder.jpg";
  // If already absolute, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Otherwise, prepend base URL
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
};

export default function PhotoGallery() {
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSlider, setShowSlider] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  async function fetchData() {
    try {
      const [catRes, photoRes] = await Promise.all([
        fetch("/api/gallery/categories").then(r => r.json()),
        fetch("/api/gallery/photos").then(r => r.json()),
      ]);

      const categoryData: Category[] = (catRes.data || []).map((cat: RawCategory) => {
        const name = cat?.name || cat?.attributes?.name || "Unnamed Category";
        const slug = cat?.slug || cat?.attributes?.slug || "unknown";

        const bgImage =
          cat?.backgroundImage?.url
            ? getStrapiMedia(cat.backgroundImage.url)
            : cat?.attributes?.cover?.data?.attributes?.url
            ? getStrapiMedia(cat.attributes.cover.data.attributes.url)
            : "/placeholder.jpg";

        return {
          id: slug,
          name,
          bgImage,
          count: (photoRes.data || []).filter((p: RawPhoto) => {
            const photoSlug = p?.category?.slug || "unknown";
            return photoSlug === slug;
          }).length,
        };
      });

      const photoData: Photo[] = (photoRes.data || []).map((p: RawPhoto, index: number) => {
        const imgUrl =
          p?.image?.url
            ? getStrapiMedia(p.image.url)
            : "/placeholder.jpg";

        return {
          id: p?.id ?? index,
          src: imgUrl,
          alt: p?.alt || p?.title || "",
          title: p?.title || "Untitled Photo",
          category: p?.category?.slug || "uncategorized",
        };
      });

      

      setCategories(categoryData);
      setPhotos(photoData);
    } catch (err) {
      console.error("Error fetching gallery data", err);
    }
  }

  fetchData();
}, []);
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
            className="absolute top-8 left-8 z-20 bg-white/40 hover:bg-[#03A0B4] text-white px-6 py-3 transition-all duration-300 backdrop-blur-sm "
          >
            Back to Gallery
          </button>

          {/* Category Title */}
          <div className="absolute top-8 right-8 z-20 text-white text-2xl font-bold bg-black/40 px-6 py-3 backdrop-blur-md ">
            {categories.find(c => c.id === selectedCategory)?.name}
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            centeredSlides={true}
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
                slidesPerView: Math.min(filteredPhotos.length, 2),
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: Math.min(filteredPhotos.length, 3),
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: Math.min(filteredPhotos.length, 3),
                spaceBetween: 10,
              },
            }}
            className="h-96 [&_.swiper-button-next]:top-1/2 [&_.swiper-button-prev]:top-1/2 [&_.swiper-pagination]:bottom-4"
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
                  className="flex items-center justify-center w-full h-96"
                >
                  <div className="relative w-full h-full overflow-hidden shadow-2xl flex flex-col justify-end">
                   <Image
  src={getStrapiMedia(photo.src)}
  alt={photo.alt || "Photo"}
  fill
  className="object-cover transition-transform duration-500 hover:scale-110"
/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-bold text-lg mb-2">{photo.title}</h3>
                      <p className="text-sm opacity-90 capitalize">
                        {categories.find(c => c.id === photo.category)?.name || photo.category}
                      </p>
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
  src={getStrapiMedia(category.bgImage)}
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
