import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Delivery = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData() || [];
  const regions = [...new Set(serviceCenters.map((c) => c.region))];
  const senderRegion = useWatch({ control, name: "Region" });

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters.filter((c) => c.region === region).map((d) => d.district);
  };

  const handleDelivery = (data) => {
    console.log(data);
    axiosSecure.post('/delivery' , data)
    .then(res => {
        if(res.data.insertedId){
             Swal.fire({
                            position:"top-center",
                            icon: 'success',
                            title: "product has been submitted . we will reach to you in 10 days",
                            showCancelButton: false,
                            timer: 2000,
                          });
        }
    })
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Delivery Form</h1>

      <form onSubmit={handleSubmit(handleDelivery)} className="bg-white p-8 rounded-3xl shadow-lg space-y-6">

        {/* Sender & Parcel Info */}
        <fieldset className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4">
          <legend className="text-xl font-semibold mb-4">Parcel Details</legend>

          {/* Sender Info */}
          <input {...register("Name")} defaultValue={user?.displayName} className="input input-bordered w-full" placeholder="Name" />
          <input {...register("Email")} defaultValue={user?.email} className="input input-bordered w-full" placeholder="Email" />
          <input {...register("Address")} className="input input-bordered w-full" placeholder="Address" />
          <input {...register("Number")} className="input input-bordered w-full" placeholder="Phone Number" />
          <input {...register("DrivingLicense")} className="input input-bordered w-full" placeholder="Driving License Number" />
          <input {...register("NID")} className="input input-bordered w-full" placeholder="NID Number" />

          {/* Region & District */}
          <select {...register("Region")} className="select select-bordered w-full">
            <option value="">Delivery Region</option>
            {regions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select {...register("District")} className="select select-bordered w-full">
            <option value="">Select District</option>
            {districtsByRegion(senderRegion).map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

         
          
          <input type="date" {...register("deliveryDate")} className="input input-bordered w-full" placeholder="Preferred Delivery Date" />
          <textarea {...register("notes")} className="textarea textarea-bordered w-full" placeholder="Additional Notes / Instructions" />

        </fieldset>

        <div className="text-center">
          <button className="btn btn-primary px-16 py-3 rounded-full text-lg">Apply as a delivery</button>
        </div>
      </form>
    </div>
  );
};

export default Delivery;
