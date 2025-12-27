import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const SendProduct = () => {
  const { register, handleSubmit, control, reset } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate()
  const serviceCenters = useLoaderData() || [];

  // unique regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight || 0);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        cost = minCharge + extraWeight * 40;
      }
    }

    Swal.fire({
      icon: "success",
      title: "Parcel Ready to Send",
      html: `
        <div style="text-align:left">
          <p><b>Parcel:</b> ${data.parcelName}</p>
          <p><b>Type:</b> ${data.parcelType}</p>
          <p><b>Weight:</b> ${parcelWeight || "N/A"} kg</p>
          <p><b>From:</b> ${data.senderDistrict}</p>
          <p><b>To:</b> ${data.receiverDistrict}</p>
          <hr/>
          <h3>Total Cost: ৳ ${cost}</h3>
        </div>
      `,
      confirmButtonText: "Confirm Send",
      confirmButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isConfirmed) {
        const productData = {
          ...data,
          cost,
          status: "pending",
          createdAt: new Date(),
        };

        axiosSecure
          .post(`${import.meta.env.VITE_API_URL}/products`, productData)
          .then((res) => {
            console.log("Product saved:", res.data);
            if (res.data.insertedId) {
              navigate('/dashboard/my-products')
              Swal.fire({
                position:"top-center",
                icon: 'success',
                title: "product has created . please pay!",
                showCancelButton: false,
                timer: 2500,
              });
            }
            // Swal.fire("Success", "Parcel sent successfully", "success");
            // reset();
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to send parcel", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">Send A Product</h1>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="bg-base-200 p-8 rounded-2xl shadow-xl"
      >
        {/* Parcel Type */}
        <div className="flex gap-8 justify-center mb-8">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              defaultChecked
              className="radio radio-accent"
            />
            Document
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio radio-accent"
            />
            Non-Document
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <input
            {...register("parcelName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Parcel Name"
          />
          <input
            type="number"
            {...register("parcelWeight")}
            className="input input-bordered w-full"
            placeholder="Weight (kg)"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender */}
          <fieldset className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Sender Details</h3>

            <input
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="input input-bordered w-full mb-3"
              placeholder="Name"
            />
            <input
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="input input-bordered w-full mb-3"
              placeholder="Email"
            />
            <input
              {...register("senderAddress")}
              className="input input-bordered w-full mb-3"
              placeholder="Address"
            />
            <input
              {...register("senderNumber")}
              className="input input-bordered w-full mb-3"
              placeholder="Phone Number"
            />

            <select
              {...register("senderRegion")}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              {...register("senderDistrict")}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {districtsByRegion(senderRegion).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </fieldset>

          {/* Receiver */}
          <fieldset className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Receiver Details</h3>

            <input
              {...register("receiverName")}
              className="input input-bordered w-full mb-3"
              placeholder="Name"
            />
            <input
              {...register("receiverEmail")}
              className="input input-bordered w-full mb-3"
              placeholder="Email"
            />

            <select
              {...register("receiverRegion")}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              {...register("receiverDistrict")}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select District</option>
              {districtsByRegion(receiverRegion).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <input
              {...register("receiverAddress")}
              className="input input-bordered w-full mb-3"
              placeholder="Address"
            />
            <input
              {...register("receiverNumber")}
              className="input input-bordered w-full"
              placeholder="Phone Number"
            />
          </fieldset>
        </div>

        <div className="text-center mt-10">
          <button className="btn btn-primary px-12 rounded-full">
            Send Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendProduct;
