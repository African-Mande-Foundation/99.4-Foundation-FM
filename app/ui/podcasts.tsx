"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation,  Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";

import PodcastCard from "./podcastcard";

type Podcast = {
  id: number;
  title: string;
  thumbnailUrl: string;
  youtubeUrl: string;
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Podcasts() {
  const prevRef = useRef<HTMLButtonElement | null>(null);

  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

useEffect(() => {
  fetch("/api/podcasts")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setPodcasts(data);
      } else {
        console.error("Podcasts API returned unexpected format:", data);
        setPodcasts([]);
      }
    })
    .catch((err) => console.error(err));
}, []);

  useEffect(() => {
    if (
      swiperRef.current?.swiper &&
      swiperRef.current.swiper.params.navigation &&
      typeof swiperRef.current.swiper.params.navigation !== "boolean"
    ) {
      const navigation = swiperRef.current.swiper.params
        .navigation as NavigationOptions;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;

      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <div className=" bg-[#0d0d0d] w-full items-center justify-center flex flex-col text-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">FEATURED PODCASTS</h2>

      <div className="relative w-full  max-w-6xl border-red-600 border-0  min-h-[20rem]">
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
          {podcasts.map((podcast) => (
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
