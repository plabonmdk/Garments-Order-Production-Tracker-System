import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const toggleHome = async (id, value) => {
    await axiosSecure.patch(`/products/home/${id}`, {
      showOnHome: value,
    });
    refetch();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const result = await axiosSecure.delete(`/products/${id}`);
        if (result.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Product removed", "success");
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Products</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Home</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={p.images?.[0]}
                  className="w-14 h-14 object-cover rounded"
                />
              </td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category}</td>
              <td>{p.createdBy}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={p.showOnHome}
                  onChange={(e) =>
                    toggleHome(p._id, e.target.checked)
                  }
                />
              </td>
              <td className="flex gap-2">
                <button
                  className="btn btn-xs btn-info"
                  onClick={() =>
                    window.location.assign(
                      `/dashboard/update-product/${p._id}`
                    )
                  }
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllProducts;
