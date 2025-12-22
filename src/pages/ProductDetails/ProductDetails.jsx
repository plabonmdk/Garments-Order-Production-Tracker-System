import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const canOrder =
    user && role !== "admin" && role !== "manager";

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-cover rounded"
      />

      <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-600">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <p><b>Category:</b> {product.category}</p>
        <p><b>Price:</b> ৳{product.price}</p>
        <p><b>Available:</b> {product.quantity}</p>
        <p><b>Minimum Order:</b> {product.minimumOrder}</p>
        <p><b>Payment:</b> {product.paymentType}</p>
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
