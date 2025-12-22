import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState([]);

  const handleImagePreview = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreview(urls);
  };

  const onSubmit = async (data) => {
    const images = Array.from(data.images).map((file) => file.name);

    const product = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      availableQty: Number(data.availableQty),
      moq: Number(data.moq),
      images,
      demoVideo: data.demoVideo,
      paymentOption: data.paymentOption,
      showOnHome: data.showOnHome || false,
      createdBy: {
        name: user.displayName,
        email: user.email,
      },
    };

    const res = await axiosSecure.post("/products", product);

    if (res.data.insertedId) {
      Swal.fire("Success!", "Product added successfully", "success");
      reset();
      setPreview([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Product Name"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Product Description"
          className="textarea textarea-bordered w-full"
        />

        <select
          {...register("category", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Jacket</option>
          <option>Accessories</option>
        </select>

        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("availableQty", { required: true })}
          placeholder="Available Quantity"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("moq", { required: true })}
          placeholder="Minimum Order Quantity"
          className="input input-bordered w-full"
        />

        {/* Image Upload */}
        <input
          type="file"
          multiple
          {...register("images", { required: true })}
          onChange={handleImagePreview}
          className="file-input file-input-bordered w-full"
        />

        {/* Image Preview */}
        <div className="grid grid-cols-3 gap-2">
          {preview.map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="h-20 object-cover rounded"
            />
          ))}
        </div>

        <input
          {...register("demoVideo")}
          placeholder="Demo Video Link (optional)"
          className="input input-bordered w-full"
        />

        <select
          {...register("paymentOption", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Payment Option</option>
          <option value="COD">Cash on Delivery</option>
          <option value="PayFirst">PayFirst</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("showOnHome")}
            className="checkbox"
          />
          Show on Home Page
        </label>

        <button className="btn btn-primary w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
