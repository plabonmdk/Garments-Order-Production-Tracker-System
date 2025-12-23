import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [processingOrderId, setProcessingOrderId] = useState(null);

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: "Cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/orders/cancel/${orderId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
        refetch();
      }
    }
  };

  const handlePayment = async (order) => {
    if (!order) return;

    setProcessingOrderId(order._id);

    const paymentInfo = {
      totalPrice: order.totalPrice,
      productName: order.productTitle,
      orderId: order._id,
    };

    try {
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire("Error", "Payment could not be processed.", "error");
    } finally {
      setProcessingOrderId(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(0, 6)}...</td>
                <td>{o.productTitle}</td>
                <td>{o.orderQuantity}</td>
                <td>{o.status}</td>
                <td>
                  {/* Show Pay button only if order is pending and not paid */}
                  {o.paid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : o.status === "pending" ? (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handlePayment(o)}
                      disabled={processingOrderId === o._id}
                    >
                      {processingOrderId === o._id ? "Processing..." : "Pay"}
                    </button>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => navigate(`/dashboard/track-order/${o._id}`)}
                  >
                    View
                  </button>

                  {o.status === "pending" && !o.paid && (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleCancel(o._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
