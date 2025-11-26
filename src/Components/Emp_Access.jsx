// import React, { useState } from 'react';

// const Emp_Access = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'employee',
//     access: {
//       project: false,
//       task: false,
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAccessChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       access: {
//         ...prev.access,
//         [name]: checked,
//       },
//     }));
//   };

//   const saveToLocalStorage = (employee) => {
//     const existingData = JSON.parse(localStorage.getItem('registeredEmployees')) || [];
//     existingData.push(employee);
//     localStorage.setItem('registeredEmployees', JSON.stringify(existingData));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('userToken');

//     if (!token) {
//       alert('No valid token found. Please log in as admin first.');
//       return;
//     }

//     try {
//       const response = await fetch('http://10.141.118.217:3001/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert('Employee registered successfully!');

//         // Save the formData to localStorage (multiple entries supported)
//         saveToLocalStorage(formData);

//         // Optional: store the server response
//         if (result.auth && result.user) {
//           localStorage.setItem('token', result.auth);
//           localStorage.setItem('user', JSON.stringify(result.user));
//         }

//         setFormData({
//           name: '',
//           email: '',
//           password: '',
//           role: 'employee',
//           access: { project: false, task: false },
//         });
//       } else {
//         alert('Registration failed: ' + (result.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4">Create Employee Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Role:</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="admin">Admin</option>
//             <option value="employee">Employee</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">Page Access:</label>
//           <label className="block">
//             <input
//               type="checkbox"
//               name="project"
//               checked={formData.access.project}
//               onChange={handleAccessChange}
//               className="mr-2"
//             />
//             Project Page
//           </label>
//           <label className="block mt-2">
//             <input
//               type="checkbox"
//               name="task"
//               checked={formData.access.task}
//               onChange={handleAccessChange}
//               className="mr-2"
//             />
//             Task Page
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//         >
//           Create Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Emp_Access;
