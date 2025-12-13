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

  const { singInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    singInUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className=" flex items-center justify-center">
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
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              className="input"
              placeholder="Password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Must include uppercase, lowercase, number & special character
              </p>
            )}

            <div>
              <Link
                to="/forgot-password"
                className="link link-hover text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>

          <p className="mt-2 text-sm">
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
