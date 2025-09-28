"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// 1. Remove Navigation from the import
import { Autoplay } from "swiper/modules";
import Image from "next/image";

// Swiper styles
import "swiper/css";

export default function BannerCarousel() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        // 2. Remove Navigation from the modules array
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        // 3. Remove the navigation prop
        // navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-2xl"
      >
        {/* Banner 1 */}
        <SwiperSlide>
          <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
            <Image
              src="/assets/banner/Meta.png"
              alt="Banner 1"
              fill
              sizes="100vw"
              className="object-cover rounded-2xl shadow-lg"
              priority
            />
          </div>
        </SwiperSlide>

        {/* Banner 2 */}
        <SwiperSlide>
          <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
            <Image
              src="/assets/banner/OpenAi.png"
              alt="Banner 2"
              fill
              sizes="100vw"
              className="object-cover rounded-2xl shadow-lg"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}