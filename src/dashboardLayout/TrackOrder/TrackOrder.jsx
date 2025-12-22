// src/dashboardLayout/Buyer/TrackOrder.jsx
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: tracking = [], isLoading } = useQuery({
    queryKey: ["track-order", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/tracking/${orderId}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Track Order</h2>
      {tracking.length === 0 && <p>No tracking info yet.</p>}

      <ul className="steps steps-vertical">
        {tracking.map((t, idx) => (
          <li key={idx} className="step step-primary">
            <div>
              <b>{t.status}</b> <br />
              Location: {t.location} <br />
              Note: {t.note || "-"} <br />
              {new Date(t.dateTime).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackOrder;
