import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Payment = () => {
  const { productId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: product } = useQuery({
    queryKey: ['product', productId],
    enabled: !!productId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    if (!product) return;

    const paymentInfo = {
      cost: product.cost,
      productId: product._id,
      senderEmail: product.senderEmail,
      productName: product.parcelName,
    };

    const res = await axiosSecure.post(
      '/create-checkout-session',
      paymentInfo
    );

    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }

  return (
    <div>
      <h2>Please pay ${product.cost} for: {product.parcelName}</h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary text-black"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
