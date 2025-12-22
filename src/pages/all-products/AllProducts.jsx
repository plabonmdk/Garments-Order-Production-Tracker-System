import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Loading from "../../shared/Loading";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {/* 3 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="card bg-base-100 shadow-lg border"
          >
            <figure>
              <img
                src={product.media?.images?.[0]}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{product.title}</h3>

              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>

              <p className="font-semibold">Price: ৳{product.price}</p>

              <p className="text-sm">
                Available: {product.availableQuantity}
              </p>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
