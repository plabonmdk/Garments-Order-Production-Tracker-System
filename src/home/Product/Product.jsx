import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../shared/Loading';
import { useNavigate } from 'react-router';

const Product = () => {
  const navigate = useNavigate();

  // Fetch 6 special products from backend
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['specialProducts', 6],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_UR}/products/special`);
      // Ensure we always return an array
      return Array.isArray(res.data) ? res.data : res.data.products || [];
    },
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <p className="text-center text-red-500 mt-6">
        Something went wrong
      </p>
    );

  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Special Products
      </h2>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={
                    product.media?.images?.[0] ||
                    'https://i.ibb.co/placeholder.png'
                  }
                  alt={product.title}
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Special
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description?.slice(0, 80)}...
                </p>
                <p className="text-indigo-600 font-bold text-lg mb-4">
                  ৳ {product.price}
                </p>

                <button
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No special products found
        </p>
      )}

      {/* Button to view all products */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/all-products')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-green-700 hover:shadow-lg"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default Product;
