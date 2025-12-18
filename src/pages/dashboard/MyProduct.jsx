import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myProduct", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user.email}`);
      return res.data;
    },
  });

  const handleProductDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };


  const handlePayment = async(product) => {

    const paymentInfo = {
      cost: product.cost,
      productId: product._id,
      senderEmail: product.senderEmail,
      productName: product.parcelName
    }
    const res = await axiosSecure.post('/create-checkout-session' , paymentInfo)
    window.location.assign(res.data.url);
  }

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg font-medium">
        Loading your products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">{error.message}</div>
    );
  }

  return (
    <div className="p-6">
      <h1>All Product : {products.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment </th>
              <th>Delivery </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.parcelName}</td>
                <td>{product.cost}</td>
                <td>
                  {product.paymentStatus === "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    
                    <button onClick={() => handlePayment(product)} className="btn btn-primary text-black">Pay</button>
                   
                  )}
                </td>
                <td>{product.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleProductDelete(product._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <BsTrash3Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
