import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../shared/Loading";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch manager products
  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ["manager-products"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/products/manager`);
        return res.data;
      } catch (err) {
        console.error("Failed to fetch products:", err);
        Swal.fire("Error", "Failed to fetch products", "error");
        return [];
      }
    },
  });

  // Delete product
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this product?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Product removed", "success");
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete product", "error");
      }
    }
  };

  // Open/close modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    let imageUrl = selectedProduct.media?.images?.[0] || "";

    if (form.image.files.length > 0) {
      const imageFile = form.image.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
        { method: "POST", body: formData }
      );
      const imgbbData = await imgbbRes.json();
      if (!imgbbData.success) {
        Swal.fire("Error", "Image upload failed", "error");
        return;
      }
      imageUrl = imgbbData.data.display_url;
    }

    const updatedProduct = {
      title: form.title.value,
      category: form.category.value,
      price: Number(form.price.value),
      media: { images: [imageUrl] },
      paymentOptions: form.paymentOptions.value
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    try {
      const res = await axiosSecure.patch(
        `/products/${selectedProduct._id}`,
        updatedProduct
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Product updated successfully", "success");
        closeModal();
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <input
        type="text"
        placeholder="Search by title or category"
        className="input input-bordered w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.media?.images?.[0]}
                      alt={product.title}
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>৳{product.price}</td>
                  <td>{product.paymentOptions?.join(", ")}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => openModal(product)}
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-bold mb-4">Update Product</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="title"
                defaultValue={selectedProduct.title}
                className="input input-bordered w-full"
                placeholder="Title"
              />
              <input
                name="category"
                defaultValue={selectedProduct.category}
                className="input input-bordered w-full"
                placeholder="Category"
              />
              <input
                name="price"
                type="number"
                defaultValue={selectedProduct.price}
                className="input input-bordered w-full"
                placeholder="Price"
              />
              <img
                src={selectedProduct.media?.images?.[0]}
                alt={selectedProduct.title}
                className="w-24 h-24 object-cover rounded"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
              <input
                name="paymentOptions"
                defaultValue={selectedProduct.paymentOptions?.join(", ")}
                className="input input-bordered w-full"
                placeholder="Cash, Card"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
