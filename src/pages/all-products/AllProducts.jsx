import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../shared/Loading";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  //  Search filter
  const filteredProducts = products.filter(
    (product) =>
      (product?.title || "")
        .toLowerCase()
        .includes((search || "").toLowerCase()) ||
      (product?.category || "")
        .toLowerCase()
        .includes((search || "").toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
      >
        <h2 className="text-3xl font-bold">All Products</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by product name or category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
          className="input input-bordered w-full md:w-96"
        />
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={product.media?.images?.[0]}
                alt={product.title}
                className="h-52 w-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-semibold line-clamp-1">
                {product.title}
              </h3>

              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>

              <p className="font-bold text-primary">৳{product.price}</p>

              <p className="text-sm">Available: {product.availableQuantity}</p>

              <button
                onClick={() => navigate(`/products/${product._id}`)}
                className="btn btn-primary btn-sm w-full mt-4"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Result */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded ${
                currentPage === page
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
