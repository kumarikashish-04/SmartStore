import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import API from "../api/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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
          "/auth/signup",
          formData
        );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      navigate("/");
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 px-5">
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900/70 backdrop-blur-lg border border-slate-700 p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold mb-2 text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Join SmartStore AI
        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none mb-4"
        />

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

        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all p-4 rounded-xl font-bold text-lg">
          Signup
        </button>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?

          <Link
            to="/login"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;