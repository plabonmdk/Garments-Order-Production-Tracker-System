import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const OrderForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { register, handleSubmit, watch } = useForm();

  const { data: product = {} } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    },
  });

  const quantity = Watch("orderQuantity") || 0;
  const totalPrice = quantity * product.price;

  const onSubmit = async (data) => {
    if (
      data.orderQuantity < product.minimumOrder ||
      data.orderQuantity > product.quantity
    ) {
      return Swal.fire("Invalid quantity");
    }

    const orderData = {
      email: user.email,
      productId: product._id,
      productTitle: product.title,
      price: product.price,
      orderQuantity: data.orderQuantity,
      totalPrice,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      notes: data.notes,
      paymentType: product.paymentType,
      status: "pending",
      createdAt: new Date(),
    };

    const res = await axiosSecure.post("/orders", orderData);

    if (product.paymentType === "online") {
      navigate(`/payment/${res.data.insertedId}`);
    } else {
      Swal.fire("Order placed successfully!");
      navigate("/dashboard/my-orders");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Order Product</h2>

      <input value={user.email} readOnly className="input" />
      <input value={product.title} readOnly className="input" />

      <input value={`৳${product.price}`} readOnly className="input" />

      <input
        type="number"
        {...register("orderQuantity", { required: true })}
        placeholder="Order Quantity"
        min={product.minimumOrder}
        max={product.quantity}
        className="input"
      />

      <input value={`Total: ৳${totalPrice}`} readOnly className="input" />

      <input {...register("firstName")} placeholder="First Name" className="input" />
      <input {...register("lastName")} placeholder="Last Name" className="input" />
      <input {...register("phone")} placeholder="Contact Number" className="input" />
      <textarea {...register("address")} placeholder="Delivery Address" className="textarea" />
      <textarea {...register("notes")} placeholder="Additional Notes" className="textarea" />

      <button className="btn btn-primary mt-4">Submit Order</button>
    </form>
  );
};

export default OrderForm;
