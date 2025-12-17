import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Nixies from "../../assets/Nixies.png";
import sider from "../../assets/sider.png";
import loginback from "../../assets/loginback.jpg";
import { apiurl } from "../../appUrl";
import Swal from 'sweetalert2';

const Login = () => {
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
      const res = await fetch( apiurl+'auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         
        
        body: JSON.stringify(form),
        credentials:"include"
          
      }     );
         console.log(form);

      const data = await res.json();

console.log("data",data);

  
  
      if (!res.ok) {
              Swal.fire({
          title: "Invalid Credentials!",
          text: "Please check your email and password.",
          icon: "error",
          confirmButtonText: "Try Again"
        });
        throw new Error(data.message || `Login failed with status ${res.status}`);

      }

  
     if (data.user.role === "employee") {
      console.log(data);
     Swal.fire({
              position: "top-bottom",
              icon: "success",
              title: "Login Successful!",
               text: "Redirecting to your dashboard...",
              showConfirmButton: false,
              timer: 1600
            }).then(()=> navigate("/employee-dashboard",{replace:true}));
           } else {
        alert('invalid credentials');
    }

  } catch (err) {
    console.error("Login error:", err);
    setError(err.message);
  }
};




  const toggleShow = () => {
    if (form.password) setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: `url(${loginback})` }}
    >
     
      <img
        src={Nixies}
        alt="Nixies Logo"
        className="absolute top-6 left-6 h-16 w-auto z-10" 
      />

      <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full flex overflow-hidden">
        <div className="hidden md:flex w-1/2 p-10 items-center justify-center">
          <img src={sider} alt="Visual" className="w-full h-auto" />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Login 
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-purple-400"
            />

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-purple-400"
              />
              <div
                className="absolute right-3 top-3.5 text-xl text-gray-500 cursor-pointer"
                onClick={toggleShow}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md uppercase tracking-wide"
            >
              Login
            </button>
          </form>

          <div className="text-sm text-center mt-4 text-gray-500">
            Forgot your password?
          </div>
          {/* <div className="text-sm text-center mt-2 text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </div> */}
          <div className="text-xs text-center text-gray-400 mt-6">
            Terms of Use · Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
