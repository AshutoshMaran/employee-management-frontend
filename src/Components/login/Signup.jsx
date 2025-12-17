import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nixies from "../../assets/Nixies.png";
import signup from "../../assets/signup.jpg";
import loginback from "../../assets/loginback.jpg";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    if (!form.confirmPassword) errs.confirmPassword = "Confirm password";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSignup = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const payload = {
      email: form.email.trim(),

      
      password: form.password
    };

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful! Redirecting to login...");
      navigate("/login",{replace:true});
    } catch (err) {
      console.error("Signup error:", err);
      setErrors({ server: err.message });
      return;
    }

    if (!localStorage.getItem(payload.email)) {
      localStorage.setItem(payload.email, JSON.stringify(payload));
    }
  };

  const inputStyle = "w-full px-4 py-3 border rounded-md focus:ring-purple-400 focus:border-purple-400";

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${loginback})` }}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full flex overflow-hidden">
        <div className="hidden md:flex w-1/2 items-center justify-center p-10">
          <img src={signup} alt="Visual" className="w-full h-auto" />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <img src={Nixies} alt="Logo" className="h-8 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={inputStyle}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md uppercase tracking-wide"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Signin
            </Link>
          </p>

          <p className="text-xs text-center text-gray-400 mt-6">
            Terms of Use · Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
