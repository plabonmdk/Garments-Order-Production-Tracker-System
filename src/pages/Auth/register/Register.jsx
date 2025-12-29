import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import background from "../../../assets/login bg.avif";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = async (data) => {
    try {
      //  Register user
      await registerUser(data.email, data.password);

      //  Upload image
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST
      }`;

      const imgRes = await axios.post(imageAPI, formData);

      if (!imgRes?.data?.data?.url) {
        throw new Error("Image upload failed");
      }

      const photoURL = imgRes.data.data.url;

      //  Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      //  Save user to DB (ROLE FIXED)
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "buyer", // ✅ role always from backend logic
        status: "pending",
        photoURL,
      };

      await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userInfo
      );

      // 🎉 Success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Please login to continue",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error?.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Already Registered",
          text: "You already have an account. Please login.",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message || "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
      {/* Header */}
      <div
        className="p-6 text-center rounded-t-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <h3 className="text-3xl font-bold text-white">
          Welcome to Premium Garments
        </h3>
        <p className="text-xl text-white mt-2">Please Register</p>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">Photo is required</p>
            )}

            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password must have 1 uppercase, 1 lowercase & 6 characters
              </p>
            )}

            <button className="btn btn-neutral mt-4 w-full">
              Register
            </button>
          </fieldset>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
