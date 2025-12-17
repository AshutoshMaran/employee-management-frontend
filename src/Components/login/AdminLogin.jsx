import React, { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Nixies from "../../assets/Nixies.png";
import { apiurl } from "../../appUrl";
import Swal from 'sweetalert2';
const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${apiurl}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      credentials:"include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await res.json();
      console.log(data);
      
      if (data.user.role === "admin") {
  
         Swal.fire({
          position: "top-bottom",
          icon: "success",
          title: "Login Successful!",
           text: "Redirecting to your dashboard...",
          showConfirmButton: false,
          timer: 1600
        }).then(()=>  navigate("/dashboard", {replace:true}));
       
      } else {
        throw new Error("Access denied. You are not authorized as admin.");
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
  title: "Invalid Credentials!",
  text: "Please check your email and password.",
  icon: "error",
  confirmButtonText: "Try Again"
});

      setError(err.message);
    }
  };

  const toggleShowPassword = () => {
    if (form.password) setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4 relative">
      <img
        src={Nixies}
        alt="Logo"
        className="absolute top-6 left-6 h-16 w-auto z-10"
      />

      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg w-full max-w-5xl overflow-hidden">
        <div className="flex flex-col items-center justify-center bg-blue-100 p-6">
          <img
            src="https://www.pngall.com/wp-content/uploads/12/Illustration-Transparent.png"
            alt="Illustration"
            className="w-40 h-40 animate-bounce"
          />
          <h2 className="text-xl font-semibold text-blue-700 mt-4">
            Welcome Back!
          </h2>
          <p className="text-sm text-blue-600 text-center mt-2">
            Secure login to your software account.
          </p>
        </div>

        <div className="p-10 flex flex-col justify-center w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <div
                className="absolute right-3 top-10 text-xl text-gray-500 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-200"
            >
              Login as Admin
            </button>
          </form>

          <div className="text-sm text-center mt-4 text-gray-500">
            Forgot your password?
          </div>

          <div className="text-xs text-center text-gray-400 mt-6">
            © 2025 Nixies Inc. · Admin Portal
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
