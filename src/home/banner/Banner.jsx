import React, { useState, useEffect } from "react";

import b1 from "../../assets/banner1.jpg";
import b2 from "../../assets/banner2.jpg";
import b3 from "../../assets/banner3.jpg";
import b4 from "../../assets/banner4.jpg";
import b5 from "../../assets/banner5.jpg";
import b6 from "../../assets/banner6.jpg";


const images = [b1, b2, b3, b4, b5, b6];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[500px] md:h-[650px] relative overflow-hidden">

      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms] ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 z-10">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Premium Garments  
          <span className="block text-blue-300">Manufacturing Solutions</span>
        </h1>

        <p className="text-white max-w-xl mt-5 text-lg md:text-xl opacity-90">
          We deliver world-class apparel production, fabric sourcing,  
          quality control & global export support for your fashion brand.
        </p>

        <button className="mt-8 w-max bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition">
          Explore Our Services
        </button>
      </div>
    </div>
  );
};

export default Banner;
