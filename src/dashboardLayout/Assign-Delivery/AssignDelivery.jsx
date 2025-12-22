import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRider, setSelectedRider] = useState("");

  //  Pending Parcels
  const { data: products = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["products", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/products?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  //  Available Riders 
  const { data: riders = [] } = useQuery({
    queryKey: ["delivery", selectedProduct?.senderDistrict, "available"],
    enabled: !!selectedProduct,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/delivery?status=approved&district=${selectedProduct.senderDistrict}&workerStatus=available`
      );
      return res.data;
    },
  });

  // Open Modal 
  const openAssignRiderModal = (product) => {
    setSelectedProduct(product);
    setSelectedRider("");
    riderModalRef.current.showModal();
  };

  // Assign Rider 
  const handleAssignRider = async () => {
    const rider = riders.find((r) => r._id === selectedRider);

    if (!rider) {
      return Swal.fire("Error", "Please select a rider", "error");
    }

    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.Email,
      riderName: rider.Name,
    };

    const res = await axiosSecure.patch(
      `/products/${selectedProduct._id}/rider`,
      riderAssignInfo
    );

    if (res.data.modifiedCount) {
      riderModalRef.current.close();
      parcelsRefetch();
      Swal.fire({
        icon: "success",
        title: "Rider Assigned Successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Assign Riders: {products.length}
      </h2>

      {/* Products Table  */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.parcelName}</td>
                <td>{product.cost}</td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
                <td>{product.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(product)}
                    className="btn btn-primary btn-sm text-white"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Modal*/}
      <dialog ref={riderModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Select a Rider</h3>

          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr
                  key={rider._id}
                  className={
                    selectedRider === rider._id ? "bg-blue-100" : ""
                  }
                >
                  <th>{index + 1}</th>
                  <td>{rider.Name}</td>
                  <td>{rider.Email}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedRider(rider._id)}
                    >
                      {selectedRider === rider._id ? "Selected" : "Select"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => riderModalRef.current.close()}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAssignRider}
            >
              Assign
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignDelivery;
