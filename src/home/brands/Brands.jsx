import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import google from "../../assets/google.webp"
import apple from '../../assets/apple.png'
import meta from '../../assets/meta.avif'
import amazon from '../../assets/amazon.jpg'
import tesla from '../../assets/tesla.jpeg'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";

const Brands = () => {
  return (
    <div className="w-full py-10">
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        autoplay={{
          delay: 700,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={google}
            alt="google"
            className="w-full h-12 object-contain"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={apple}
            alt="apple"
            className="w-full h-12 object-contain"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="microsoft"
            className="w-full h-12 object-contain"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={meta}
            alt="meta"
            className="w-full h-12 object-contain"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={amazon}
            alt="amazon"
            className="w-full h-12 object-contain"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
            alt="youtube"
            className="w-full h-12 object-contain"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={tesla}
            alt="tesla"
            className="w-full h-12 object-contain"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Brands;
