import React from "react";
import { motion } from "framer-motion";

const reviewsData = [
  {
    id: 1,
    name: "John Carter",
    role: "Fashion Brand Owner",
    review:
      "Outstanding garment quality and on-time delivery. Their production team is highly professional.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Ayesha Rahman",
    role: "Boutique Founder",
    review:
      "Very satisfied with fabric sourcing and finishing quality. Highly recommended!",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Export Manager",
    review:
      "Smooth communication and export handling. Great experience working with them.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 4,
    name: "Sara Ahmed",
    role: "Clothing Retailer",
    review: "Amazing attention to detail and quality fabrics. Very happy!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Designer",
    review:
      "Professional service and timely updates. My favorite supplier now!",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 6,
    name: "Priya Singh",
    role: "Boutique Owner",
    review:
      "The team understands my requirements perfectly. Excellent finishing.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 7,
    name: "Carlos Ruiz",
    role: "Export Manager",
    review:
      "Highly recommended! Communication and quality are top-notch.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 8,
    name: "Linda Park",
    role: "Fashion Brand Owner",
    review: "Great fabrics and excellent customer support. Loved it!",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 9,
    name: "Tom Harris",
    role: "Clothing Manufacturer",
    review: "Reliable, professional and very detail-oriented team.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=18",
  },
];

// Animation Variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3 },
  },
};

// Alternate left-right slide animation
const cardVariants = (index) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
});

const Reviews = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          What Our Clients Say
        </motion.h2>

        {/* Reviews Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {reviewsData.map((review, idx) => (
            <motion.div
              key={review.id}
              custom={idx}
              variants={cardVariants(idx)}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                “{review.review}”
              </p>

              {/* Rating */}
              <div className="flex text-yellow-400">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
