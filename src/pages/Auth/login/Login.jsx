import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";
import bgImg from "../../../assets/login bg.avif";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ spelling fixed
  const { signInUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Login Success:", result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl overflow-hidden">
        <div
          className="h-40 flex flex-col items-center justify-center text-white text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <h3 className="text-3xl font-bold">Welcome to Premium Garments</h3>
          <p className="text-sm">Please Login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered"
              placeholder="Email"
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
              })}
              className="input input-bordered"
              placeholder="Password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}

            <div className="mt-2">
              <Link
                to="/forgot-password"
                className="link link-hover text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>

          <p className="mt-2 text-sm text-center">
            New to Premium Garments?{" "}
            <Link
              state={location.state}
              className="text-blue-500 underline"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
