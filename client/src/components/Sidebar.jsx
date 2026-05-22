import {
    FaChartBar,
    FaBoxOpen,
    FaPlus,
  } from "react-icons/fa";
  
  import {
    Link,
    useLocation,
  } from "react-router-dom";
  
  import { motion } from "framer-motion";
  
  const Sidebar = () => {
    const location = useLocation();
  
    const menu = [
      {
        name: "Dashboard",
        path: "/",
        icon: <FaChartBar />,
      },
  
      {
        name: "Products",
        path: "/products",
        icon: <FaBoxOpen />,
      },
  
      {
        name: "Add Product",
        path: "/create-product",
        icon: <FaPlus />,
      },
    ];
  
    return (
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[260px] min-h-screen bg-slate-950 border-r border-slate-800 p-6"
      >
        <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          SmartStore
        </h1>
  
        <div className="flex flex-col gap-4">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-blue-500 shadow-lg shadow-blue-500/30"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    );
  };
  
  export default Sidebar;