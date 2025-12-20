import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Delivery = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData() || [];

  // unique regions
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  // watch selected region
  const selectedRegion = useWatch({
    control,
    name: "Region"
  });

  // districts based on region
  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);
  };

  // submit handler
  const handleDelivery = (data) => {
    const deliveryData = {
      ...data,
      role: "delivery",        
      status: "pending",       
      appliedAt: new Date(),   
    };

    axiosSecure.post('/delivery', deliveryData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Application submitted successfully",
            text: "We will reach you within 10 days",
            showConfirmButton: false,
            timer: 2000,
          });
          reset();
          navigate('/dashboard');
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later",
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Delivery Application Form
      </h1>

      <form
        onSubmit={handleSubmit(handleDelivery)}
        className="bg-white p-8 rounded-3xl shadow-lg space-y-6"
      >

        {/* Parcel / Sender Info */}
        <fieldset className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4">
          <legend className="text-xl font-semibold">
            Applicant Information
          </legend>

          <input
            {...register("Name", { required: true })}
            defaultValue={user?.displayName}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />

          <input
            {...register("Email", { required: true })}
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full"
            placeholder="Email"
          />

          <input
            {...register("Address", { required: true })}
            className="input input-bordered w-full"
            placeholder="Address"
          />

          <input
            {...register("Number", { required: true })}
            className="input input-bordered w-full"
            placeholder="Phone Number"
          />

          <input
            {...register("DrivingLicense", { required: true })}
            className="input input-bordered w-full"
            placeholder="Driving License Number"
          />

          <input
            {...register("NID", { required: true })}
            className="input input-bordered w-full"
            placeholder="NID Number"
          />

          {/* Region */}
          <select
            {...register("Region", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Region</option>
            {regions.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            {...register("District", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districtsByRegion(selectedRegion).map(district => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <input
            type="date"
            {...register("deliveryDate", { required: true })}
            className="input input-bordered w-full"
          />

          <textarea
            {...register("notes")}
            className="textarea textarea-bordered w-full"
            placeholder="Additional Notes (optional)"
          />
        </fieldset>

        <div className="text-center">
          <button className="btn btn-primary px-16 py-3 rounded-full text-lg">
            Apply as Delivery
          </button>
        </div>

      </form>
    </div>
  );
};

export default Delivery;
