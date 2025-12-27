import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      {/* Main Card Animation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl w-full bg-white rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden"
      >
        
        {/* Left Side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-indigo-600 text-white p-10"
        >
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-indigo-100 mb-8">
            Feel free to reach out to us anytime. We’d love to hear from you.
          </p>

          <div className="space-y-4 text-lg">
            <p> Gaibandha, Bangladesh</p>
            <p> +880 1755416347</p>
            <p> plabonmdk@example.com</p>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="p-10"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Send a Message
          </h3>

          <form className="space-y-5">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring" }}
            >
              <label className="block mb-1 text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <label className="block mb-1 text-gray-600">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </motion.div>

            {/* Button Hover Animation */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
