import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: products = [], refetch } = useQuery({
    queryKey: ["manager-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/manager");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this product?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Product removed", "success");
        }
      }
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or category"
        className="input input-bordered w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.images?.[0]}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.paymentOption}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/update-product/${product._id}`)
                    }
                    className="btn btn-xs btn-info"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
