import React from "react";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const user = result.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "user",
          status: "pending",
          photoURL: user.photoURL,
        };

        axiosSecure.post(`${import.meta.env.VITE_API_URL}/users`, userInfo).then(() => {
          navigate(location.state?.from || "/");
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 text-white font-medium shadow-md hover:opacity-90 transition duration-200"
    >
      <FaGoogle className="w-5 h-5" />
      <span>Login with Google</span>
    </button>
  );
};

export default SocialLogin;
