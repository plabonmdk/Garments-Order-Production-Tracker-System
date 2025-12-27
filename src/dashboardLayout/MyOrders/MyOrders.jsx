import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [processingOrderId, setProcessingOrderId] = useState(null);

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to load orders</p>;

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: "Cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/orders/cancel/${orderId}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to cancel order", "error");
    }
  };

  const handlePayment = async (order) => {
    setProcessingOrderId(order._id);

    try {
      const res = await axiosSecure.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        orderId: order._id,
        productId: order.productId,
        name: order.productTitle,
        description: `Order for ${order.productTitle}`,
        image: order.productImage,
        totalPrice: order.totalPrice,
        quantity: order.orderQuantity,
        customer: {
          email: user.email,
          name: user.displayName,
        },
      });

      if (res.data?.url) {
        window.location.replace(res.data.url);
      } else {
        Swal.fire("Error", "Checkout URL not found", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Payment failed", "error");
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
              <th>Qty</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No orders found
                </td>
              </tr>
            )}

            {orders.map((o) => (
              <tr key={o._id}>
                <td
                  title={o._id}
                  className="cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(o._id)}
                >
                  {o._id.slice(0, 6)}...
                </td>
                <td>{o.productTitle}</td>
                <td>{o.orderQuantity}</td>
                <td>
                  <span
                    className={`badge ${
                      o.status === "paid"
                        ? "badge-success"
                        : o.status === "cancelled"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td>
                  {o.status === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <button
                      className="btn btn-xs btn-success"
                      disabled={processingOrderId === o._id}
                      onClick={() => handlePayment(o)}
                    >
                      {processingOrderId === o._id ? "Processing..." : "Pay"}
                    </button>
                  )}
                </td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => {
                      setSelectedOrder(o);
                      setIsModalOpen(true);
                    }}
                  >
                    View
                  </button>

                  {o.status === "pending" && (
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
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Order Details</h3>
            <p><strong>Product:</strong> {selectedOrder.productTitle}</p>
            <p><strong>Quantity:</strong> {selectedOrder.orderQuantity}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
            <p><strong>Product ID:</strong> {selectedOrder.productId}</p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
