

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { apiurl } from "../../appUrl";

// const ViewRequest = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(apiurl + "profile-change-request/getRequestById/" + id)
//       .then((res) => res.json())
//       .then((data) => {
//         setRequest(data.request);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching request:", err);
//         setLoading(false);
//       });
//   }, [id]);

  
//   const handleStatusChange = async (action) => {
//     try {
//       let bodyData = {};

//       if (action === "approved") {
//         bodyData = {
//           approve: true,
//           reject: false,
//           action: "approved",
//         };
//       } else if (action === "rejected") {
//         bodyData = {
//           approve: false,
//           reject: true,
//           action: "rejected",
//         };
//       }

//       const res = await fetch(
//         apiurl + "profile-change-request/admin-action/" + id,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(bodyData),
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         alert(`Request ${action} successfully!`);
//         navigate("/requests"); 
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Error updating status");
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-20">Loading...</p>;
//   }

//   if (!request) {
//     return <p className="text-center mt-20">No request data found for ID {id}</p>;
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-[28rem] mx-auto my-10">
//         <h3 className="text-xl font-bold mb-4">Request Details</h3>
//          {request.firstName && (
//     <p><strong>First Name:</strong> {request.firstName}</p>
//   )}

//   {request.lastName && (
//     <p><strong>Last Name:</strong> {request.lastName}</p>
//   )}

//   {request.email && (
//     <p><strong>Email:</strong> {request.email}</p>
//   )}

//   {request.phone && (
//     <p><strong>Phone:</strong> {request.phone}</p>
//   )}
//         {/* <p>
//           <strong>Request:</strong> {request.request}
//         </p> */}

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={() => handleStatusChange("approved")}
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Accept
//           </button>
//           <button
//             onClick={() => handleStatusChange("rejected")}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Decline
//           </button>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewRequest;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { apiurl } from "../../appUrl";

// const ViewRequest = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeclineModal, setShowDeclineModal] = useState(false);
//   const [declineReason, setDeclineReason] = useState("");

//   useEffect(() => {
//     fetch(apiurl + "profile-change-request/getRequestById/" + id)
//       .then((res) => res.json())
//       .then((data) => {
//         setRequest(data.request);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching request:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleStatusChange = async (action) => {
//     try {
//       let bodyData = {};

//       if (action === "approved") {
//         bodyData = { approve: true, reject: false, action: "approved" };
//       } else if (action === "rejected") {
//         if (!declineReason.trim()) {
//           alert("Please enter a reason before declining.");
//           return;
//         }
//         bodyData = {
//           approve: false,
//           reject: true,
//           action: "rejected",
//           reason: declineReason,
//         };
//       }

//       const res = await fetch(
//         apiurl + "profile-change-request/admin-action/" + id,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bodyData),
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         alert(`Request ${action} successfully!`);
//         navigate("/requests");
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Error updating status");
//     }
//   };

//   if (loading) return <p className="text-center mt-20">Loading...</p>;
//   if (!request)
//     return <p className="text-center mt-20">No request found for ID {id}</p>;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-[28rem] mx-auto my-10 relative">
//         {/* 🔍 View button (Top-right corner) */}
//         <button
//           onClick={() => setShowViewModal(true)}
//           className="absolute right-4 top-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//         >
//           View
//         </button>

//         <h3 className="text-xl font-bold mb-4">Request Details</h3>
//         {request.firstName && (
//           <p>
//             <strong>First Name:</strong> {request.firstName}
//           </p>
//         )}
//         {request.lastName && (
//           <p>
//             <strong>Last Name:</strong> {request.lastName}
//           </p>
//         )}
//         {request.email && (
//           <p>
//             <strong>Email:</strong> {request.email}
//           </p>
//         )}
//         {request.phone && (
//           <p>
//             <strong>Phone:</strong> {request.phone}
//           </p>
//         )}

//         <div className="flex justify-between mt-6">
//           <button
//             onClick={() => handleStatusChange("approved")}
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Accept
//           </button>
//           <button
//             onClick={() => setShowDeclineModal(true)}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Decline
//           </button>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//           >
//             Back
//           </button>
//         </div>
//       </div>


//       {showViewModal && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[30rem] relative">
//             <h2 className="text-lg font-semibold mb-4">Full Request Details</h2>

//             {request.reason && (
//               <p className="mb-3">
//                 <strong>Reason:</strong> {request.reason}
//               </p>
//             )}
//             {request.editProof && (
//               <div className="mb-3">
//                 <strong>Edit Proof:</strong>{" "}
//                 <a
//                   href={request.editProof}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   View File
//                 </a>
//               </div>
//             )}
//             {request.addressProof && (
//               <div className="mb-3">
//                 <strong>Address Proof:</strong>{" "}
//                 <a
//                   href={request.addressProof}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   View File
//                 </a>
//               </div>
//             )}
//             {request.educationCertificate && (
//               <div className="mb-3">
//                 <strong>Education Certificate:</strong>{" "}
//                 <a
//                   href={request.educationCertificate}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   View File
//                 </a>
//               </div>
//             )}



//             {showViewModal && (
//               <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//                 <div className="bg-white p-6 rounded-xl shadow-lg w-[30rem] relative">
//                   <h2 className="text-lg font-semibold mb-4 text-center">
//                     Full Request Details
//                   </h2>

//                   {request.reason && (
//                     <p className="mb-3">
//                       <strong>Reason:</strong> {request.reason}
//                     </p>
//                   )}

//                   {request.editProof && (
//                     <div className="mb-3">
//                       <strong>Edit Proof:</strong>{" "}
//                       <a
//                         href={`${apiurl}${request.editProof.replace(/^\/?/, "")}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline hover:text-blue-800"
//                       >
//                         View File
//                       </a>
//                     </div>
//                   )}

//                   {request.addressProof && (
//                     <div className="mb-3">
//                       <strong>Address Proof:</strong>{" "}
//                       <a
//                         href={`${apiurl}${request.addressProof.replace(/^\/?/, "")}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline hover:text-blue-800"
//                       >
//                         View File
//                       </a>
//                     </div>
//                   )}

//                   {request.educationCertificate && (
//                     <div className="mb-3">
//                       <strong>Education Certificate:</strong>{" "}
//                       <a
//                         href={`${apiurl}${request.educationCertificate.replace(/^\/?/, "")}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline hover:text-blue-800"
//                       >
//                         View File
//                       </a>
//                     </div>
//                   )}

//                   {/* Profile View Button */}
//                   <div className="mt-6 flex justify-end">
//                     <button
//                       onClick={() => navigate("/profile")}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Profile View
//                     </button>
//                   </div>


//                   <button
//                     onClick={() => setShowViewModal(false)}
//                     className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>
//             )}


//             <button
//               onClick={() => setShowViewModal(false)}
//               className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}


//       {showDeclineModal && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[25rem] relative">
//             <h2 className="text-lg font-semibold mb-4 text-red-600">
//               Decline Request
//             </h2>
//             <textarea
//               rows="4"
//               placeholder="Enter reason for declining..."
//               value={declineReason}
//               onChange={(e) => setDeclineReason(e.target.value)}
//               className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-300"
//             />
//             <div className="flex justify-end mt-4 space-x-2">
//               <button
//                 onClick={() => setShowDeclineModal(false)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   handleStatusChange("rejected");
//                   setShowDeclineModal(false);
//                 }}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Submit
//               </button>
//             </div>
//             <button
//               onClick={() => setShowDeclineModal(false)}
//               className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewRequest;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiurl } from "../../appUrl";

const ViewRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  useEffect(() => {
    fetch(apiurl + "profile-change-request/getRequestById/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data.request); // 👈 helpful for debugging
        setRequest(data.request);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching request:", err);
        setLoading(false);
      });
  }, [id]);

  const handleStatusChange = async (action) => {
    try {
      let bodyData = {};

      if (action === "approved") {
        bodyData = { approve: true, reject: false, action: "approved" };
      } else if (action === "rejected") {
        if (!declineReason.trim()) {
          alert("Please enter a reason before declining.");
          return;
        }
        bodyData = {
          approve: false,
          reject: true,
          action: "rejected",
          reason: declineReason,
        };
      }

      const res = await fetch(
        apiurl + "profile-change-request/admin-action/" + id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(`Request ${action} successfully!`);
        navigate("/requests");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!request)
    return <p className="text-center mt-20">No request found for ID {id}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[28rem] mx-auto my-10 relative">
        {/* 🔍 View button */}
        <button
          onClick={() => setShowViewModal(true)}
          className="absolute right-4 top-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </button>

        <h3 className="text-xl font-bold mb-4">Request Details</h3>

        {request.firstName && (
          <p>
            <strong>First Name:</strong> {request.firstName}
          </p>
        )}
        {request.lastName && (
          <p>
            <strong>Last Name:</strong> {request.lastName}
          </p>
        )}
        {request.email && (
          <p>
            <strong>Email:</strong> {request.email}
          </p>
        )}
        {request.mobileNo && (
          <p>
            <strong>Mobile No:</strong> {request.mobileNo}
          </p>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => handleStatusChange("approved")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={() => setShowDeclineModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decline
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Back
          </button>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[30rem] relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Full Request Details
            </h2>

            {request.employeeReason && (
              <p className="mb-3">
                <strong>Reason:</strong> {request.employeeReason}
              </p>
            )}

            {request.editProof && (
              <div className="mb-3">
                <strong>Edit Proof:</strong>{" "}
                <a
                  href={`${apiurl}${request.editProof.replace(/^\/?/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View File
                </a>
              </div>
            )}

            {request.addressProof && (
              <div className="mb-3">
                <strong>Address Proof:</strong>{" "}
                <a
                  href={`${apiurl}${request.addressProof.replace(/^\/?/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View File
                </a>
              </div>
            )}

            {request.educationCertificate && (
              <div className="mb-3">
                <strong>Education Certificate:</strong>{" "}
                <a
                  href={`${apiurl}${request.educationCertificate.replace(
                    /^\/?/,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View File
                </a>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Profile View
              </button>
            </div>

            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[25rem] relative">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Decline Request
            </h2>
            <textarea
              rows="4"
              placeholder="Enter reason for declining..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-300"
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowDeclineModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleStatusChange("rejected");
                  setShowDeclineModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Submit
              </button>
            </div>
            <button
              onClick={() => setShowDeclineModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRequest;
