import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const OrderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order = {} } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Order Details #{order._id}
      </h2>

      <p><b>User:</b> {order.userName}</p>
      <p><b>Product:</b> {order.productName}</p>
      <p><b>Quantity:</b> {order.quantity}</p>
      <p><b>Status:</b> {order.status}</p>

      <h3 className="font-semibold mt-6 mb-2">Tracking History</h3>

      <ul className="timeline timeline-vertical">
        {order.tracking?.map((t, idx) => (
          <li key={idx}>
            <div className="timeline-start">{t.status}</div>
            <div className="timeline-end text-sm">
              {new Date(t.time).toLocaleString()}
              <br />
              {t.location}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
