// // src/LeaveRecall.jsx
// import React, { useState } from "react";

// const LeaveRecall = () => {
//   const initialLeaves = [
//     {
//       id: 1,
//       name: "John Smith",
//       type: "Casual",
//       from: "08/10/2024",
//       to: "08/20/2024",
//       reason: "Vacation",
//       recalled: false,
//       recallMessage: "",
//     },
//     {
//       id: 2,
//       name: "Emily Johnson",
//       type: "Maternity",
//       from: "08/01/2024",
//       to: "09/30/2024",
//       reason: "Maternity Leave",
//       recalled: false,
//       recallMessage: "",
//     },
//     {
//       id: 3,
//       name: "David Lee",
//       type: "Sick",
//       from: "08/15/2024",
//       to: "08/18/2024",
//       reason: "Medical",
//       recalled: false,
//       recallMessage: "",
//     },
//   ];

//   const [leaves, setLeaves] = useState(initialLeaves);
//   const [searchText, setSearchText] = useState("");
//   const [selectedLeave, setSelectedLeave] = useState(null);
//   const [recallMessage, setRecallMessage] = useState("");

//   const openRecallModal = (id) => {
//     const leave = leaves.find((l) => l.id === id);
//     setSelectedLeave(leave);
//     setRecallMessage("");
//   };

//   const submitRecallMessage = () => {
//     if (!recallMessage.trim()) {
//       alert("Please enter a recall message.");
//       return;
//     }

//     const updated = leaves.map((leave) =>
//       leave.id === selectedLeave.id
//         ? { ...leave, recalled: true, recallMessage }
//         : leave
//     );
//     setLeaves(updated);
//     closeModal();
//   };

//   const closeModal = () => {
//     setSelectedLeave(null);
//     setRecallMessage("");
//   };

//   const filteredLeaves = leaves.filter(
//     (leave) =>
//       leave.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       leave.type.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">🔔 Recall Employee from Leave</h1>

//         <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
//           <input
//             type="text"
//             placeholder="Search by name or type..."
//             className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 shadow-sm"
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>

//         {filteredLeaves.length === 0 ? (
//           <p className="text-gray-600 text-center">No approved leaves found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-lg shadow">
//               <thead className="bg-gray-200 text-gray-700 text-left">
//                 <tr>
//                   <th className="px-4 py-3">Employee Name</th>
//                   <th className="px-4 py-3">Leave Type</th>
//                   <th className="px-4 py-3">From</th>
//                   <th className="px-4 py-3">To</th>
//                   <th className="px-4 py-3">Reason</th>
//                   <th className="px-4 py-3">Recalled</th>
//                   <th className="px-4 py-3">Recall Message</th>
//                   <th className="px-4 py-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredLeaves.map((leave) => (
//                   <tr key={leave.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-3">{leave.name}</td>
//                     <td className="px-4 py-3">{leave.type}</td>
//                     <td className="px-4 py-3">{leave.from}</td>
//                     <td className="px-4 py-3">{leave.to}</td>
//                     <td className="px-4 py-3">{leave.reason}</td>
//                     <td className="px-4 py-3">
//                       {leave.recalled ? (
//                         <span className="text-yellow-600 font-semibold">Yes</span>
//                       ) : (
//                         "No"
//                       )}
//                     </td>
//                     <td className="px-4 py-3 text-gray-700 whitespace-pre-wrap">
//                       {leave.recallMessage || "—"}
//                     </td>
//                     <td className="px-4 py-3">
//                       {!leave.recalled && (
//                         <button
//                           onClick={() => openRecallModal(leave.id)}
//                           className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
//                         >
//                           Recall
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Modal for Admin Recall Message */}
//       {selectedLeave && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
//             <h2 className="text-xl font-semibold mb-4 text-red-700">📝 Admin Recall Message</h2>
//             <p className="mb-3 text-gray-700">
//               Write a recall message for <strong>{selectedLeave.name}</strong>:
//             </p>
//             <textarea
//               rows="4"
//               className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//               placeholder="E.g., Please return to office for an urgent project update..."
//               value={recallMessage}
//               onChange={(e) => setRecallMessage(e.target.value)}
//             ></textarea>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={submitRecallMessage}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Send Recall
//               </button>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-600 hover:underline"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveRecall;
