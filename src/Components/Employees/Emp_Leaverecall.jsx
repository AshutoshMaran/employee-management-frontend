// // src/pages/Leave.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import EmployeeNavbar from './Emp_Navbar';

// const Emp_Leave = () => {
//   const [reason, setReason] = useState('');
//   const [decision, setDecision] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Dummy employee data for this example
//   const employeeId = 'EMP001'; // Replace this with actual ID from context/auth

//   const handleLeaveResponse = async (status) => {
//     if (status === 'declined' && !reason.trim()) {
//       alert('Please provide a reason to decline the recall.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem('userToken');

//       const response = await axios.post('http://192.168.1.25:5000/leave/employee/leave',
//         {
//           employeeId,
//           status,
//           reason: status === 'declined' ? reason : '',
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setDecision(status);
//         alert(`You have ${status} the recall.`);
//       } else {
//         alert('Server responded but something went wrong.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error submitting response: ' + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <EmployeeNavbar
//         user={{ name: 'Mini Shrivastava', email: 'm.@example.com' }}
//         notifications={['Leave recall notice', 'Policy update available']}
//       />

//       {/* Leave Page Content */}
//       <div className="min-h-screen bg-blue-50 p-6 font-sans">
//         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
//           {/* Title */}
//           <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
//             📘 Leave Recall
//           </h2>

//           {/* Message */}
//           <div className="bg-blue-100 text-gray-800 p-4 rounded mb-6">
//             <p className="leading-relaxed">
//               Dear User,
//               <br /><br />
//               This is to inform you that you have been <strong>RECALLED</strong> from your
//               <strong> CASUAL Leave</strong> by your line manager named <strong>Biruktawit Mesfin</strong>
//               for an urgent meeting and task to be completed in the office before <strong>2nd June, 2022</strong>.
//             </p>
//           </div>

//           {/* Decline Reason */}
//           <div className="mb-4">
//             <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
//               If No, state reason why?
//             </label>
//             <textarea
//               id="reason"
//               rows="3"
//               placeholder="State your reason..."
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               disabled={loading}
//             ></textarea>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={() => handleLeaveResponse('approved')}
//               disabled={loading}
//               className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded transition duration-200 disabled:opacity-60"
//             >
//               {loading && decision === 'approved' ? 'Submitting...' : 'Approve'}
//             </button>
//             <button
//               onClick={() => handleLeaveResponse('declined')}
//               disabled={loading}
//               className="border border-red-500 text-red-600 hover:bg-red-50 font-medium px-6 py-2 rounded transition duration-200 disabled:opacity-60"
//             >
//               {loading && decision === 'declined' ? 'Submitting...' : 'Decline'}
//             </button>
//           </div>

//           {/* Result Message */}
//           {decision && (
//             <div className="mt-6 text-sm text-gray-700">
//               ✅ You have <strong className="capitalize">{decision}</strong> the recall.
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Emp_Leave;
