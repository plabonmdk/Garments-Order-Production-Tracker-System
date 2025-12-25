import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const images = [
  "https://i.ibb.co/9HCypQty/pexels-equalstock-32048352.jpg",
  "https://i.ibb.co/BH8f5m2q/workers-in-a-large-garment-factory-engaged-in-sewing-pink-textile-products-in-a-well-lit-production.jpg",
  "https://i.ibb.co/WpfYvgkb/photo-1741183394845-9bc06a8ce293.jpg",
  "https://i.ibb.co/kVzgn2yZ/images-3.jpg",
  "https://i.ibb.co/hrh6Bst/360-F-396682976-y-FU9q-Mb-L9d-Cdm-SD0-Zos7k-SIg-Mne-Eb4w-Q.jpg",
  "https://i.ibb.co/N6xyLWcv/premium-photo-1682089748132-d9bda2c7a220.jpg",
  "https://i.ibb.co/rR8QP8dQ/gazipur-bangladesh-02nd-may-2021-new-garment-workers-are-undergoing-training-in-mg-garments-training.jpg",
];

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
    <div
      id="banner"
      className="w-full h-[500px] md:h-[650px] relative overflow-hidden"
    >
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

        {/* Button */}
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
