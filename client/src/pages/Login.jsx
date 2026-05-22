import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import API from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      navigate("/");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-5">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900/70 backdrop-blur-lg border border-slate-700 p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold mb-2 text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Login to continue
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none mb-6"
        />

        <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02] transition-all p-4 rounded-xl font-bold text-lg">
          Login
        </button>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-400 ml-2"
          >
            
            Signup
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;