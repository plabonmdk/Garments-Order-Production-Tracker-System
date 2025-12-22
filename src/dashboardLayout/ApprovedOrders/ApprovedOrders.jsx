import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const statuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped / Out for Delivery",
];

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [modalOrder, setModalOrder] = useState(null);
  const [trackingData, setTrackingData] = useState({
    status: "",
    location: "",
    note: "",
    dateTime: new Date().toISOString().slice(0, 16),
  });

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/approved");
      return res.data;
    },
  });

  const handleTrackingChange = (e) => {
    setTrackingData({ ...trackingData, [e.target.name]: e.target.value });
  };

  const handleAddTracking = async (orderId) => {
    const res = await axiosSecure.post(
      `/orders/tracking/${orderId}`,
      trackingData
    );
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Tracking info added", "success");
      setModalOrder(null);
      refetch();
    }
  };

  const handleViewTracking = async (orderId) => {
    const res = await axiosSecure.get(`/orders/tracking/${orderId}`);
    const history = res.data;

    Swal.fire({
      title: "Tracking History",
      html: history
        .map(
          (t) =>
            `<p><b>${t.status}</b> at ${t.location} on ${new Date(
              t.dateTime
            ).toLocaleString()}<br/>Note: ${t.note}</p>`
        )
        .join("<hr/>"),
      width: 500,
      showCloseButton: true,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Approved Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(0, 6)}...</td>
                <td>{o.userName}</td>
                <td>{o.productName}</td>
                <td>{o.quantity}</td>
                <td>{new Date(o.approvedAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleViewTracking(o._id)}
                  >
                    View Tracking
                  </button>

                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => setModalOrder(o)}
                  >
                    Add Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">
              Add Tracking for {modalOrder.productName}
            </h3>

            <select
              name="status"
              value={trackingData.status}
              onChange={handleTrackingChange}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select Status</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="location"
              value={trackingData.location}
              onChange={handleTrackingChange}
              placeholder="Location"
              className="input input-bordered w-full mb-2"
            />

            <textarea
              name="note"
              value={trackingData.note}
              onChange={handleTrackingChange}
              placeholder="Note (optional)"
              className="textarea textarea-bordered w-full mb-2"
            ></textarea>

            <input
              type="datetime-local"
              name="dateTime"
              value={trackingData.dateTime}
              onChange={handleTrackingChange}
              className="input input-bordered w-full mb-2"
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                className="btn btn-secondary"
                onClick={() => setModalOrder(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={() => handleAddTracking(modalOrder._id)}
              >
                Add Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrders;
