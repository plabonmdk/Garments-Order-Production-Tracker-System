import React from "react";
import { Link } from "react-router";
import img from '../assets/talaa.png'

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      
      {/* Image */}
      <img
        src={img}
        alt="Forbidden"
        className="w-48 mb-6"
      />

      {/* Text */}
      <h1 className="text-4xl font-bold text-red-500 mb-3">
        403 - Access Forbidden
      </h1>

      <p className="text-gray-600 text-center max-w-md mb-8">
        Sorry, you don’t have permission to access this page.
        Please go back to a safe place.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link to="/">
          <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
            Go to Home
          </button>
        </Link>

        <Link to="/dashboard">
          <button className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
