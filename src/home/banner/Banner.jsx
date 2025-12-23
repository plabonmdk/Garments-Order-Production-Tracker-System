import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

import b1 from "../../assets/banner1.jpg";
import b2 from "../../assets/banner2.jpg";
import b3 from "../../assets/banner3.jpg";
import b4 from "../../assets/banner4.jpg";
import b5 from "../../assets/banner5.jpg";
import b6 from "../../assets/banner6.jpg";

const images = [b1, b2, b3, b4, b5, b6];


const MotionLink = motion(Link);

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
      {/* Background Slider */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 z-10">
        {/* Heading */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Premium Garments
          <span className="block text-blue-300">
            Manufacturing Solutions
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white max-w-xl mt-5 text-lg md:text-xl opacity-90"
        >
          We deliver world-class apparel production, fabric sourcing,
          quality control & global export support for your fashion brand.
        </motion.p>

        
        <MotionLink
          to="/all-products"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-max inline-block bg-blue-500 text-white font-semibold px-7 py-3 rounded-md shadow-lg hover:bg-blue-600 transition-all"
        >
          View Products
        </MotionLink>
      </div>
    </div>
  );
};

export default Banner;
