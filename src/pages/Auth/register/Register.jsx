import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import background from "../../../assets/login bg.avif";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = async (data) => {
    try {
      // Register user with email & password
      const result = await registerUser(data.email, data.password);

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`;
      const imgRes = await axios.post(imageAPI, formData);

      // Update user profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: imgRes.data.data.url,
      });

      // Optional: Save role & status to your database
      await axios.post("/api/users", {
        name: data.name,
        email: data.email,
        role: data.role,
        status: "pending",
        photoURL: imgRes.data.data.url,
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Please login to continue",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Already Registered",
          text: "You already have an account with this email. Please login.",
        }).then(() => navigate("/login"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: error.message,
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
              placeholder="Enter your name"
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
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            {/* Role Dropdown */}
            <label className="label">Role</label>
            <select
              {...register("role", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">Role is required</p>
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
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Password must contain at least one uppercase and one lowercase
                letter
              </p>
            )}

            <button className="btn btn-neutral mt-4 w-full">Register</button>
          </fieldset>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-blue-500 underline"
            >
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
