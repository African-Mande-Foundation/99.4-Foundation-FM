
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
    alt: 'Slider Image 1', title: 'Stay Informed', subtitle: 'Your source for the latest news.'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756945.jpg?alt=media&token=454a5f6f-4b7e-4310-b6eb-1b003d14869f',
    alt: 'Slider Image 2', title: 'Community Voices', subtitle: 'Stories that matter to you.'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3756993.jpg?alt=media&token=ecda6a3f-cd2d-4715-85b6-1099632bec55',
    alt: 'Slider Image 3', title: 'In-Depth Analysis', subtitle: 'Understanding the world around us.'
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-sound-on-3757007.jpg?alt=media&token=de42aa2d-0147-4ec3-8e15-f6fa87b5417c',
    alt: 'Slider Image 3', title: 'In-Depth Analysis', subtitle: 'Understanding the world around us.'
  }
];
const ImageSlider = () => {
  return (
    <div className="relative w-full h-screen">
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
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                unoptimized={true}
              />

              {/* Rectangular overlay positioned at 60% height */}
              <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-4/5 bg-black/50 p-6 rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
                  {image.title}
                </h2>
                <p className="text-white text-center opacity-90">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;

<style jsx global>{`
  .swiper-button-next,
  .swiper-button-prev {
    @apply swiper-button-custom;
  }
`}</style>