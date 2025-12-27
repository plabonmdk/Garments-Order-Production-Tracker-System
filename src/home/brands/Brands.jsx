import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import google from "../../assets/google.webp";
import apple from "../../assets/apple.png";
import meta from "../../assets/meta.avif";
import amazon from "../../assets/amazon.jpg";
import tesla from "../../assets/tesla.jpeg";

import "swiper/css";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Trusted by Global Brands
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          We proudly collaborate with some of the world’s most innovative and
          trusted companies.
        </p>
      </div>

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          autoplay={{
            delay: 1200,
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
        >
          {[
            { src: google, alt: "Google" },
            { src: apple, alt: "Apple" },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
              alt: "Microsoft",
            },
            { src: meta, alt: "Meta" },
            { src: amazon, alt: "Amazon" },
            {
              src: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
              alt: "YouTube",
            },
            { src: tesla, alt: "Tesla" },
          ].map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-20">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="h-12 object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brands;
