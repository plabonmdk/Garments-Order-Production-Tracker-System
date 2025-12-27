import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [updatedData, setUpdatedData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    showOnHome: false,
  });

  // ---------------- Fetch Products ----------------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/admin/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };
console.log(products)
  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------------- Delete Product ----------------
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/admin/products/${id}`);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      fetchProducts();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  // ---------------- Toggle Show on Home ----------------
  const handleToggleShow = async (id, showOnHome) => {
    try {
      await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, {
        showOnHome: !showOnHome,
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  // ---------------- Open Update Modal ----------------
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdatedData({
      title: product.title || "",
      price: product.price || "",
      category: product.category || "",
      image: product.media?.image || "",
      showOnHome: product.showOnHome || false,
    });
    setIsModalOpen(true);
  };

  // ---------------- Image Upload ----------------
  const handleImageUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
        formData
      );

      setUpdatedData((prev) => ({
        ...prev,
        image: res.data.data.url,
      }));

      Swal.fire("Success", "Image uploaded successfully!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  // ---------------- Update Product ----------------
  const handleUpdate = async () => {
    if (!selectedProduct) return;

    try {
      const payload = {
        title: updatedData.title,
        price: Number(updatedData.price),
        category: updatedData.category,
        showOnHome: updatedData.showOnHome,
        media: {
          image: updatedData.image,
        },
      };

      const res = await axiosSecure.patch(
        `/admin/products/${selectedProduct._id}`,
        payload
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Product updated successfully.", "success");
        setIsModalOpen(false);
        fetchProducts();
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
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
            {products.map((product) => {
              const createdByName =
                typeof product.createdBy === "object"
                  ? product.createdBy?.name
                  : product.createdBy;

              return (
                <tr key={product._id} className="text-center border-t">
                  <td>
                    <img
                      src={product.media?.images}
                      alt={product.title}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>৳{product.price}</td>
                  <td>{product.category}</td>
                  <td>{createdByName || "Unknown"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={product.showOnHome || false}
                      onChange={() =>
                        handleToggleShow(product._id, product.showOnHome)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary mr-2"
                      onClick={() => openUpdateModal(product)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* ---------------- Update Modal ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-start z-50">
          <div className="bg-white p-6 rounded shadow mt-20 w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>

            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            <div className="mb-2">
              <label className="block mb-1">Title</label>
              <input
                className="w-full border p-2"
                value={updatedData.title}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, title: e.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1">Price</label>
              <input
                type="number"
                className="w-full border p-2"
                value={updatedData.price}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, price: e.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1">Category</label>
              <input
                className="w-full border p-2"
                value={updatedData.category}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, category: e.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
              {updatedData.image && (
                <img
                  src={updatedData.image}
                  alt="preview"
                  className="w-32 h-32 mt-2 object-cover"
                />
              )}
            </div>

            <div className="mb-4">
              <label>
                <input
                  type="checkbox"
                  checked={updatedData.showOnHome}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      showOnHome: e.target.checked,
                    })
                  }
                />{" "}
                Show on Home
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllProducts;
