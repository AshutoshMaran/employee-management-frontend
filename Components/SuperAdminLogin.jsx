import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import superadmin from '../assets/superadmin.jpg';
import { apiurl } from '../appUrl';
import Swal from 'sweetalert2';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiurl}superadmin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials:"include",
      });

      if (!response.ok) {
        const errorResult = await response.json();
        // alert('Login failed: ' + (errorResult.message || 'Unknown error'));
        Swal.fire({
  title: "Invalid Credentials!",
  text: "Please check your email and password.",
  icon: "error",
  confirmButtonText: "Try Again"
});

        return;
      }
       Swal.fire({
  position: "top-bottom",
  icon: "success",
  title: "Login Successful!",
   text: "Redirecting to your dashboard...",
  showConfirmButton: false,
  timer: 1600
}).then(()=> navigate('/superdashboard',{replace:true}));
       
     
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

 

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${superadmin})` }}
    >
      
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl border border-gray-200">

        <h2 className="text-2xl font-bold text-center text-black mb-6">Super Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-black mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
            />
          </div>

          <div>
            <label className="block text-sm text-black mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 hover:text-black"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
