import { motion } from "framer-motion";
import { useNavigate } from "react-router"; 
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();       
      navigate("/login"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
            className="w-24 h-24 rounded-full"
          />
          <h2 className="text-xl font-bold mt-4">
            {user?.displayName || "User"}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-error w-full mt-6"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default MyProfile;
