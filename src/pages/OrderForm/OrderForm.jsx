import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../shared/Loading";

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { control, register, handleSubmit, watch } = useForm();

  // Fetch product details
  const { data: product = {}, isLoading, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const quantity = Number(watch("orderQuantity") || 0);
  const totalPrice = quantity * product.price;

  const onSubmit = async (data) => {
    const orderQty = Number(data.orderQuantity);

    if (orderQty < product.minimumOrder || orderQty > product.availableQuantity) {
      return Swal.fire("Invalid quantity");
    }

    const orderData = {
      email: user.email,
      productId: product._id,
      productTitle: product.title,
      price: product.price,
      orderQuantity: orderQty,
      totalPrice,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      notes: data.notes,
      paymentOptions: product.paymentOptions,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);

      // Refetch product data after order placed
      await refetch();

      if (product.paymentOptions?.includes("Online")) {
        navigate(`/payment/${res.data.insertedId}`);
      } else {
        Swal.fire("Order placed successfully!");
        navigate("/dashboard/my-orders");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to place order");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Order Product</h2>

      <input value={user.email} readOnly className="input w-full" />
      <input value={product.title} readOnly className="input w-full" />
      <input value={`৳${product.price}`} readOnly className="input w-full" />

      <Controller
        name="orderQuantity"
        control={control}
        defaultValue={product.minimumOrder}
        rules={{ required: true, min: product.minimumOrder, max: product.availableQuantity }}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            placeholder={`Order Quantity (Min: ${product.minimumOrder}, Max: ${product.availableQuantity})`}
            className="input w-full"
          />
        )}
      />

      <input value={`Total: ৳${totalPrice}`} readOnly className="input w-full" />

      <input {...register("firstName", { required: true })} placeholder="First Name" className="input w-full" />
      <input {...register("lastName", { required: true })} placeholder="Last Name" className="input w-full" />
      <input {...register("phone", { required: true })} placeholder="Contact Number" className="input w-full" />
      <textarea {...register("address", { required: true })} placeholder="Delivery Address" className="textarea w-full" />
      <textarea {...register("notes")} placeholder="Additional Notes" className="textarea w-full" />

      <button type="submit" className="btn btn-primary w-full mt-4">Submit Order</button>
    </form>
  );
};

export default OrderForm;
