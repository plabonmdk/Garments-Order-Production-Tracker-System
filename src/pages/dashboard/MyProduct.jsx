import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";

const MyProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

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

  //  Search filter
  const filteredProducts = products.filter(
    (product) =>
      product.parcelName?.toLowerCase().includes(search.toLowerCase()) ||
      product.trackingId?.toLowerCase().includes(search.toLowerCase())
  );

  //  Delete
  const handleProductDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Product has been deleted.", "success");
          }
        });
      }
    });
  };

  //  Edit
  const handleEdit = (product) => {
    Swal.fire({
      title: "Edit Product",
      html: `
        <input id="parcelName" class="swal2-input" value="${product.parcelName}" />
        <input id="cost" type="number" class="swal2-input" value="${product.cost}" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const parcelName = document.getElementById("parcelName").value;
        const cost = document.getElementById("cost").value;

        if (!parcelName || !cost) {
          Swal.showValidationMessage("All fields required");
        }

        return { parcelName, cost };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/products/${product._id}`, result.value)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire("Updated!", "Product updated successfully", "success");
            }
          });
      }
    });
  };

  //  Payment
  const handlePayment = async (product) => {
    const paymentInfo = {
      cost: product.cost,
      productId: product._id,
      senderEmail: product.senderEmail,
      productName: product.parcelName,
    };
    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  if (isLoading)
    return <div className="text-center py-10">Loading...</div>;

  if (isError)
    return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        All Product : {filteredProducts.length}
      </h1>

      
      <input
        type="text"
        placeholder="Search by name or tracking id..."
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th>Tracking ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.parcelName}</td>
                <td>{product.cost}</td>
                <td>
                  {product.paymentStatus === "paid" ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(product)}
                      className="btn btn-primary btn-sm text-black"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{product.deliveryStatus}</td>
                <td>{product.trackingId}</td>
                <td className="flex gap-2">
                  <button className="btn btn-square">
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn btn-square"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleProductDelete(product._id)}
                    className="btn btn-square"
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
