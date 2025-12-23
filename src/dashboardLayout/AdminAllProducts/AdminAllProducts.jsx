import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/products/${id}`);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      fetchProducts();
    }
  };

  const handleToggleShow = async (id, showOnHome) => {
    await axiosSecure.patch(`/admin/products/${id}`, { showOnHome: !showOnHome });
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Show on Home</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center border-t">
              <td>
                <img src={product.image} alt={product.title} className="w-16 h-16 object-cover mx-auto"/>
              </td>
              <td>{product.title}</td>
              <td>৳{product.price}</td>
              <td>{product.category}</td>
              <td>{product.createdBy}</td>
              <td>
                <input
                  type="checkbox"
                  checked={product.showOnHome || false}
                  onChange={() => handleToggleShow(product._id, product.showOnHome)}
                />
              </td>
              <td>
                <button className="btn btn-sm btn-primary mr-2" onClick={() => alert("Redirect to edit page")}>Update</button>
                <button className="btn btn-sm btn-error" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllProducts;
