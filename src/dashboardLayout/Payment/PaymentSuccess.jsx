import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../shared/Loading';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(res => setPaymentInfo(res.data))
        .catch(err => console.error("Payment info error:", err));
    }
  }, [sessionId, axiosSecure]);

  if (!paymentInfo) {
    return <Loading></Loading>
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20 text-center">
      <h2 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h2>
      <p className="text-lg mb-2">Thank you for your purchase.</p>
      <div className="mt-6 text-left">
        <p className="text-gray-700">
          <span className="font-semibold">Transaction ID:</span>{" "}
          <span className="text-blue-600">{paymentInfo.transactionId}</span>
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Tracking ID:</span>{" "}
          <span className="text-blue-600">{paymentInfo.trackingId}</span>
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Product:</span>{" "}
          {paymentInfo.productTitle}
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
