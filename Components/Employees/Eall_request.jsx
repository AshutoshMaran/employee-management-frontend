

// import React, { useEffect, useState } from "react";
// import EmployeeNavbar from "./Emp_Navbar";
// import { apiurl } from "../../appUrl";
// import { Eye } from "lucide-react"; // 👁️ eye icon

// const Eall_request = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedReason, setSelectedReason] = useState(""); // modal reason
//   const [showModal, setShowModal] = useState(false); // modal state

//   const employeeId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await fetch(
//           `${apiurl}profile-change-request/requests/${employeeId}`
//         );
//         if (!res.ok) {
//           throw new Error(`Server responded with ${res.status}`);
//         }

//         const data = await res.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         console.error("Error fetching requests:", err);
//         setError("Failed to fetch data from API.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [employeeId]);

//   // Modal open handler
//   const openModal = (reason) => {
//     setSelectedReason(reason || "No reason provided.");
//     setShowModal(true);
//   };

//   // Modal close handler
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedReason("");
//   };

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-500">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-500">{error}</p>;
//   }

//   if (requests.length === 0) {
//     return <p className="text-center mt-10 text-gray-500">No requests found.</p>;
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <EmployeeNavbar />
//       <h2 className="text-2xl font-bold mb-4 text-center">All Requests</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 rounded-md bg-white shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2 text-left">First Name</th>
//               <th className="border p-2 text-left">Last Name</th>
//               <th className="border p-2 text-left">Email</th>
//               <th className="border p-2 text-left">Status</th>
//               <th className="border p-2 text-left">Reason</th> {/* 👁️ new column */}
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr key={req._id} className="hover:bg-gray-50">
//                 <td className="border p-2">{req.employeeDbId?.firstName || "-"}</td>
//                 <td className="border p-2">{req.employeeDbId?.lastName || "-"}</td>
//                 <td className="border p-2">{req.employeeDbId?.email || "-"}</td>
//                 <td
//                   className={`border p-2 capitalize font-semibold ${
//                     req.status === "approved"
//                       ? "text-green-600"
//                       : req.status === "requested"
//                       ? "text-yellow-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {req.status || "-"}
//                 </td>
//                 <td className="border p-2 text-center">
//                   <button
//                     onClick={() => openModal(req.reason)}
//                     className="text-blue-600 hover:text-blue-800"
//                     title="View Reason"
//                   >
//                     <Eye className="inline w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔹 Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-96 p-6">
//             <h3 className="text-lg font-bold mb-3 text-gray-800">Request Reason</h3>
//             <p className="text-gray-700 mb-5">{selectedReason}</p>
//             <div className="flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Eall_request;

// import React, { useEffect, useState } from "react";
// import EmployeeNavbar from "./Emp_Navbar";
// import { apiurl } from "../../appUrl";
// import { Eye } from "lucide-react"; // 👁️ eye icon

// const Eall_request = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedReason, setSelectedReason] = useState(""); // modal reason
//   const [rejectedBy, setRejectedBy] = useState(""); // who rejected
//   const [showModal, setShowModal] = useState(false); // modal state

//   const employeeId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const res = await fetch(
//           `${apiurl}profile-change-request/requests/${employeeId}`
//         );
//         if (!res.ok) {
//           throw new Error(`Server responded with ${res.status}`);
//         }

//         const data = await res.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         console.error("Error fetching requests:", err);
//         setError("Failed to fetch data from API.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [employeeId]);

//   // Modal open handler
//   const openModal = (reason, by) => {
//     setSelectedReason(reason || "No reason provided.");
//     setRejectedBy(by || "Unknown");
//     setShowModal(true);
//   };

//   // Modal close handler
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedReason("");
//     setRejectedBy("");
//   };

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-500">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-500">{error}</p>;
//   }

//   if (requests.length === 0) {
//     return <p className="text-center mt-10 text-gray-500">No requests found.</p>;
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <EmployeeNavbar />
//       <h2 className="text-2xl font-bold mb-4 text-center">All Requests</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 rounded-md bg-white shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2 text-left">First Name</th>
//               <th className="border p-2 text-left">Last Name</th>
//               <th className="border p-2 text-left">Email</th>
//               <th className="border p-2 text-left">Status</th>
//               <th className="border p-2 text-left">Reason</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => {
//               const isRejected = req.status?.toLowerCase() === "rejected";
//               const adminReason = req.adminReason?.trim();
//               const superAdminReason = req.superAdminReason?.trim();

              
//               let reasonToShow = "";
//               let rejectedBy = "";
//               if (isRejected) {
//                 if (superAdminReason) {
//                   reasonToShow = superAdminReason;
//                   rejectedBy = "Super Admin";
//                 } else if (adminReason) {
//                   reasonToShow = adminReason;
                  
//                   rejectedBy = "Admin";
//                 }
                
//               }

//               return (
//                 <tr key={req._id} className="hover:bg-gray-50">
//                   <td className="border p-2">{req.employeeDbId?.firstName || "-"}</td>
//                   <td className="border p-2">{req.employeeDbId?.lastName || "-"}</td>
//                   <td className="border p-2">{req.employeeDbId?.email || "-"}</td>
//                   <td
//                     className={`border p-2 capitalize font-semibold ${
//                       req.status === "approved"
//                         ? "text-green-600"
//                         : req.status === "requested"
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {req.status || "-"}
//                   </td>

//                   <td className="border p-2 text-center">
//                     {isRejected && reasonToShow ? (
//                       <button
//                         onClick={() => openModal(reasonToShow, rejectedBy)}
//                         className="text-blue-600 hover:text-blue-800"
//                         title="View Rejection Reason"
//                       >
//                         <Eye className="inline w-5 h-5" />
//                       </button>
//                     ) : (
//                       "-"
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔹 Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-96 p-6">
//             <h3 className="text-lg font-bold mb-3 text-gray-800">
//               Rejection Details
//             </h3>
//             <p className="text-sm text-gray-600 mb-1">
//               <strong>Rejected By:</strong> {rejectedBy}
//             </p>
//             <p className="text-gray-700 mb-5 whitespace-pre-line">
//               <strong>Reason:</strong> {selectedReason}
//             </p>
//             <div className="flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Eall_request;


import React, { useEffect, useState } from "react";
import EmployeeNavbar from "./Emp_Navbar";
import { apiurl } from "../../appUrl";
import { Eye } from "lucide-react"; // 👁️ eye icon

const Eall_request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReason, setSelectedReason] = useState(""); // modal reason
  const [showModal, setShowModal] = useState(false); // modal state

  // const employeeId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `${apiurl}profile-change-request/requests/emp`,
          {credentials:"include"},
        );
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        setRequests(data.requests || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to fetch data from API.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Modal open handler
  const openModal = (reason) => {
    setSelectedReason(reason || "No reason provided.");
    setShowModal(true);
  };

  // Modal close handler
  const closeModal = () => {
    setShowModal(false);
    setSelectedReason("");
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (requests.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No requests found.</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <EmployeeNavbar />
      <h2 className="text-2xl font-bold mb-4 text-center">All Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">First Name</th>
              <th className="border p-2 text-left">Last Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Reason</th> {/* 👁️ new column */}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              // ✅ Check for rejection (admin/superadmin)
              const isRejected = req.status?.toLowerCase().includes("rejected");
              const adminReason = req.adminReason?.trim();
              const superAdminReason = req.superAdminReason?.trim();

              let reasonToShow = "";
              let rejectedBy = "";

              // ✅ Decide whose reason to show
              if (isRejected) {
                if (superAdminReason) {
                  reasonToShow = superAdminReason;
                  rejectedBy = "Super Admin";
                } else if (adminReason) {
                  reasonToShow = adminReason;
                  rejectedBy = "Admin";
                }
              }

              return (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {req.employeeDbId?.firstName || "-"}
                  </td>
                  <td className="border p-2">
                    {req.employeeDbId?.lastName || "-"}
                  </td>
                  <td className="border p-2">
                    {req.employeeDbId?.email || "-"}
                  </td>
                  <td
                    className={`border p-2 capitalize font-semibold ${
                      req.status?.toLowerCase().includes("approved")
                        ? "text-green-600"
                        : req.status?.toLowerCase().includes("requested")
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status || "-"}
                  </td>

                  {/* ✅ Show reason button only if rejected */}
                  <td className="border p-2 text-center">
                    {isRejected && reasonToShow ? (
                      <button
                        onClick={() =>
                          openModal(`${reasonToShow}\n(Rejected by: ${rejectedBy})`)
                        }
                        className="text-blue-600 hover:text-blue-800"
                        title="View Rejection Reason"
                      >
                        <Eye className="inline w-5 h-5" />
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Rejection Reason</h3>
            <p className="text-gray-700 whitespace-pre-line mb-5">
              {selectedReason}
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eall_request;
