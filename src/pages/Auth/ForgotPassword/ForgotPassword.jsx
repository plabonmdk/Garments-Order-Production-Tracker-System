import React from "react";
import { useForm } from "react-hook-form";

import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../../firebase/Firebase.init";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleSubmitPassword = (data) => {
    const user = auth.currentUser;

    
    if (user) {
      updatePassword(user, data.password)
        .then(() => {
          alert("Password changed successfully");
          navigate("/");
        })
        .catch((error) => alert(error.message));
    }

    
    else {
      sendPasswordResetEmail(auth, data.email)
        .then(() => {
          alert("Reset link sent to your email");
          navigate("/login");
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-xl font-bold text-center">
            Forgot / Change Password
          </h2>

          <form onSubmit={handleSubmit(handleSubmitPassword)}>
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />

            {/* New Password */}
            <label className="label mt-2">New Password</label>
            <input
              type="password"
              {...register("password", { minLength: 6 })}
              className="input input-bordered w-full"
              placeholder="New password"
            />
           

            <button className="btn btn-neutral w-full mt-4">
              Submit
            </button>
          </form>

          <p className="text-xs text-center mt-2 text-gray-500">
            Logged-in user → password will change directly <br />
            Logged-out user → reset email will be sent
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
