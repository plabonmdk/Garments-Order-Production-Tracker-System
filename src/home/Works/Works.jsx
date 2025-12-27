import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiClipboard,
  FiPackage,
  FiTruck,
} from "react-icons/fi";

const steps = [
  {
    title: "Choose Product",
    desc: "Browse catalog and pick the product you like.",
    icon: <FiShoppingCart />,
    border: "from-orange-400 to-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Place Order",
    desc: "Fill order details and select payment method.",
    icon: <FiClipboard />,
    border: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Quality Check",
    desc: "We inspect and prepare your item for shipment.",
    icon: <FiPackage />,
    border: "from-sky-400 to-sky-600",
    bg: "bg-sky-50",
  },
  {
    title: "Fast Delivery",
    desc: "Delivered quickly and safely to your doorstep.",
    icon: <FiTruck />,
    border: "from-violet-400 to-violet-600",
    bg: "bg-violet-50",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Works = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl">
          Simple steps to get your product — transparent process, trusted quality.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`relative rounded-2xl p-[1.5px] bg-gradient-to-br ${step.border}`}
          >
            <div
              className={`h-full rounded-2xl p-6 ${step.bg} flex flex-col`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center text-2xl text-gray-800">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 flex-grow">
                {step.desc}
              </p>

              <button className="mt-4 text-sm font-medium text-gray-900 hover:underline w-fit">
                Learn more →
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Works;
