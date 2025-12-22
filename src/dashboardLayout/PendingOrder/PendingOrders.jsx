import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/pending");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/orders/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Order approved", "success");
      refetch();
    }
  };

  const handleReject = async (id) => {
    const res = await axiosSecure.patch(`/orders/reject/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Order rejected", "success");
      refetch();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
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
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/order-details/${o._id}`)
                    }
                    className="btn btn-xs btn-info"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleApprove(o._id)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(o._id)}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No pending orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
