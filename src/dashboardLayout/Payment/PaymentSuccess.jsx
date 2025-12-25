import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../shared/Loading";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      Swal.fire({
        icon: "error",
        title: "No session found",
        text: "Payment session ID is missing",
      }).then(() => navigate("/dashboard/my-orders"));
      return;
    }

    const fetchPaymentInfo = async () => {
      try {
        const res = await axiosSecure.get(`/payment-success?session_id=${sessionId}`);
        setPaymentInfo(res.data);
      } catch (err) {
        console.error("Payment success error:", err);
        Swal.fire({
          icon: "error",
          title: "Payment verification failed",
          text: err.response?.data?.message || err.message,
        }).then(() => navigate("/dashboard/my-orders"));
      }
    };

    fetchPaymentInfo();
  }, [sessionId, axiosSecure, navigate]);

  if (!paymentInfo) return <Loading />;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-20 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-3">
        Payment Successful
      </h2>

      <p className="mb-4">Thank you for your purchase!</p>

      <div className="text-left space-y-2 mb-6">
        <p>
          <b>Transaction ID:</b> {paymentInfo.transactionId}
        </p>
        <p>
          <b>Order ID:</b> {paymentInfo.orderId}
        </p>
        <p>
          <b>Product:</b> {paymentInfo.productTitle}
        </p>
        <p>
          <b>Total Paid:</b> ${paymentInfo.amount}
        </p>
        <p>
          <b>Customer Email:</b> {paymentInfo.customer}
        </p>
      </div>

      <button
        onClick={() => navigate("/dashboard/my-orders")}
        className="btn btn-primary"
      >
        Go to My Orders
      </button>
    </div>
  );
};

export default PaymentSuccess;
