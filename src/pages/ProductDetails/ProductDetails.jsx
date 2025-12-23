import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../shared/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error || !product)
    return <p className="text-center text-red-500">Product not found</p>;

  const canOrder = user && role !== "admin" && role !== "manager";

  return (
    <div className="max-w-6xl  mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-6"
      >
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={product?.media?.images?.[0]}
            alt={product?.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold mb-3">{product.title}</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><b>Category:</b> {product.category}</p>
              <p><b>Price:</b> ৳{product.price}</p>
              <p><b>Available:</b> {product.availableQuantity}</p>
              <p><b>Minimum Order:</b> {product.minimumOrder}</p>
              <p className="col-span-2">
                <b>Payment Options:</b>{" "}
                {product.paymentOptions?.join(", ")}
              </p>
            </div>
          </div>

          {canOrder && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/order/${product._id}`)}
              className="mt-8 w-full btn btn-primary"
            >
              Order / Booking
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
