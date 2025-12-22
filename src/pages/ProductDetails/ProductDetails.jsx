import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../shared/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();

   console.log("Product ID from URL 👉", id);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      console.log("API response data 👉", res.data)
      return res.data;
    },
  });
  console.log("Product from React Query 👉", product);


  if (isLoading) return <Loading />;

  if (error || !product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  const canOrder = user && role !== "admin" && role !== "manager";
 


  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Image */}
      <img
        src={product?.media?.images?.[0]}
        alt={product?.title}
        className="w-full h-80 object-cover rounded"
      />

      <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-600">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <p><b>Category:</b> {product.category}</p>
        <p><b>Price:</b> ৳{product.price}</p>
        <p><b>Available:</b> {product.availableQuantity}</p>
        <p><b>Minimum Order:</b> {product.minimumOrder}</p>
        <p>
          <b>Payment Options:</b>{" "}
          {product.paymentOptions?.join(", ")}
        </p>
      </div>

      {canOrder && (
        <button
          onClick={() => navigate(`/order/${product._id}`)}
          className="btn btn-primary mt-6"
        >
          Order / Booking
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
