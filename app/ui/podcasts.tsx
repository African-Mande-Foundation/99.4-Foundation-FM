"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,  Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import PodcastCard from "./podcastcard";

const samplePodcasts = [
  {
    id: 1,
    title: "Emmanuel Kembe",
    thumbnailUrl: "https://img.youtube.com/vi/hZ2Zi7nfCd0/sddefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=hZ2Zi7nfCd0&pp=ygUIcG9kY2FzdHM%3D",
  },
  {
    id: 2,
    title: "Single Dee",
    thumbnailUrl: "https://img.youtube.com/vi/iB4SsbmuTDc/sddefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=iB4SsbmuTDc&pp=ygUIcG9kY2FzdHPSBwkJxwkBhyohjO8%3D",
  },
  {
    id: 3,
    title: "vee",
    thumbnailUrl: "https://img.youtube.com/vi/uGPwswAvV2s/sddefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=uGPwswAvV2s&pp=ygUIcG9kY2FzdHM%3D",
  },
];

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Podcasts() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
const nextRef = useRef<HTMLButtonElement | null>(null);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className=" bg-[#0d0d0d] text-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">FEATURED PODCASTS</h2>

      <div className="relative items-center justify-center flex max-w-6xl border-red-600 border-0  min-h-[20rem]">
        {/* Swiper with custom navigation */}
        <Swiper
        ref={swiperRef}
          modules={[Navigation, Autoplay]}
          autoplay={{
  delay: 4000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}}
          spaceBetween={20}
          slidesPerView={3}
          centeredSlides={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
         onBeforeInit={(swiper) => {
  // Type-safe guard: only assign if navigation is an object
  const navigation = swiper.params.navigation;

  if (navigation && typeof navigation !== "boolean") {
    navigation.prevEl = prevRef.current;
    navigation.nextEl = nextRef.current;
  }
}}
        breakpoints={{
      0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 20, },
      425: { slidesPerView: 2, centeredSlides: true, },
      768: { slidesPerView: 2, centeredSlides: true },
      1024: { slidesPerView: 3, centeredSlides: true },
    }}

touchStartPreventDefault={false}
  resistanceRatio={0} 
   preventInteractionOnTransition={true}
  simulateTouch={true}
  className="border-0 border-green-500 h-[300px] flex items-center justify-center p-4"

        >
          {samplePodcasts.map((podcast) => (
            <SwiperSlide key={podcast.id} tabIndex={-1} >
                {({ isActive, isPrev, isNext }) => (
    <div
      className={cn(
        "  transition-all duration-500 ease-in-out h-full",
        isActive ? "scale-110 opacity-100 z-20" : "scale-90 opacity-30 z-10",
        (isPrev || isNext) && "z-10"
      )}
       
       tabIndex={-1}
    >
              <PodcastCard
                title={podcast.title}
                thumbnailUrl={podcast.thumbnailUrl}
                youtubeUrl={podcast.youtubeUrl}
                onClick={() => window.open(podcast.youtubeUrl, "_blank")}
              />
              </div>)}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Left Button */}
        <button
  ref={prevRef}
  className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-[#0d0d0d] lg:bg-transparent text-white rounded-full p-2 hover:bg-white hover:text-black transition"
>
  <ChevronLeft size={30} />
</button>

{/* Custom Right Button */}
<button
  ref={nextRef}
  className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-[#0d0d0d] lg:bg-transparent text-white rounded-full p-2 hover:bg-white hover:text-black transition"
>
  <ChevronRight size={30} />
</button>
      </div>
    </div>
  );
}

<style jsx global>{`
  .swiper-slide-active {
    transform: scale(1.05) !important;
    opacity: 1 !important;
    z-index: 20;
  }

  .swiper-slide-prev,
  .swiper-slide-next {
    transform: scale(0.9) !important;
    opacity: 0.5 !important;
    z-index: 10;
  }


`}</style>
