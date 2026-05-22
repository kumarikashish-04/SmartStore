import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[80px] bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 flex items-center justify-between px-8"
    >
      <div className="flex items-center gap-3">
        <div className="bg-blue-500 p-3 rounded-xl">
          <FaStore size={20} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            SmartStore AI
          </h1>

          <p className="text-sm text-gray-400">
            AI Ecommerce Dashboard
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-semibold"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Navbar;