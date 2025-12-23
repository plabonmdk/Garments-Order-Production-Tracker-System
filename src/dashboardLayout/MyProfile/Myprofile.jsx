// src/dashboardLayout/Buyer/MyProfile.jsx
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md"
      >
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={
              user?.photoURL ||
              "https://i.ibb.co/2FsfXqM/user.png"
            }
            alt="User"
            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user?.displayName || "User"}
          </h2>
          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-sm">
          <p>
            <b>Phone:</b>{" "}
            {user?.phoneNumber || "N/A"}
          </p>
          <p>
            <b>Address:</b>{" "}
            {user?.address || "N/A"}
          </p>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="btn btn-error w-full mt-6"
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MyProfile;
