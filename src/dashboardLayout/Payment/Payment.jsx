import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const axiosSecure = useAxiosSecure();
  const [isProcessing, setIsProcessing] = useState(false);

  const { isLoading, data: order } = useQuery({
    queryKey: ["order", orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    if (!order) return;

    setIsProcessing(true);

    const paymentInfo = {
      totalPrice: order.totalPrice,
      productName: order.productTitle,
      orderId: order._id,
    };

    try {
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Payment could not be processed.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <span className="loading loading-infinity loading-xl"></span>;
  if (!order) return <p className="text-red-500">Order not found!</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Please pay ${order.totalPrice} for: {order.productTitle}
      </h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary text-black"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </div>
  );
};

export default Payment;
