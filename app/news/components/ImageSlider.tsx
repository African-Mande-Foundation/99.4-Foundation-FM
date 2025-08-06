'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const sliderImages = [
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756768.jpg?alt=media&token=e776768b-4691-4347-922d-0af8bf155208',
    alt: 'People recording a podcast in a studio',
    title: 'Stay Informed',
    subtitle: 'Your source for the latest news.',
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756945.jpg?alt=media&token=454a5f6f-4b7e-4310-b6eb-1b003d14869f',
    alt: 'Microphones and speakers in a setup',
    title: 'Community Voices',
    subtitle: 'Stories that matter to you.',
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756993.jpg?alt=media&token=ecda6a3f-cd2d-4715-85b6-1099632bec55',
    alt: 'Podcast discussion with guests',
    title: 'In-Depth Analysis',
    subtitle: 'Understanding the world around us.',
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3757007.jpg?alt=media&token=de42aa2d-0147-4ec3-8e15-f6fa87b5417c',
    alt: 'Recording studio equipment',
    title: 'Expert Insights',
    subtitle: 'Professional takes on pressing issues.',
  },
];

const ImageSlider = () => {
  return (
    <section aria-label="News and Stories Carousel" className="relative w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />

              {/* Overlay */}
              <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-11/12 max-w-3xl bg-black/40 backdrop-blur-sm p-6 rounded-md shadow-lg">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 drop-shadow-md">
                  {image.title}
                </h2>
                <p className="text-white text-sm sm:text-base text-center opacity-90 drop-shadow-md">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ImageSlider;
