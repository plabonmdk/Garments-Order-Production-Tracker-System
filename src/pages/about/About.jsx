import { motion } from "framer-motion";
import { Link } from "react-router";


const MotionLink = motion(Link);

const About = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">

        {/* About Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4"
        >
          About Weave X
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-gray-600 mb-8"
        >
          Weave X is committed to delivering premium-quality garments with fast
          delivery and affordable pricing while prioritizing customer
          satisfaction.
        </motion.p>

        {/* Button */}
        <MotionLink
          to="/all-product"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transition"
        >
          View Products
        </MotionLink>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-purple-600 mb-3">
            Our Mission
          </h3>
          <p className="max-w-2xl mx-auto text-gray-600">
            To provide stylish, comfortable, and affordable garments that make
            every customer feel confident and valued.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <h3 className="text-3xl font-bold text-purple-600 mb-3">
            Our Vision
          </h3>
          <p className="max-w-2xl mx-auto text-gray-600">
            To become Bangladesh’s most trusted and innovative fashion brand,
            known for quality and customer excellence.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { value: "500+", label: "Happy Customers" },
            { value: "20+", label: "Awards Won" },
            { value: "10+", label: "Years in Business" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-indigo-100"
            >
              <h4 className="text-4xl font-bold text-indigo-600">
                {item.value}
              </h4>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
