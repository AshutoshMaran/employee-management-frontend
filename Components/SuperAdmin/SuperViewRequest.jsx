

// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { apiurl } from "../../appUrl";

// const SuperViewRequest = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [request, setRequest] = useState(location.state || null);
//   const [loading, setLoading] = useState(!request);
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
//         console.error("API Error:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleStatusChange = async (action, reason = "") => {
//     try {
//       let bodyData = {};
//       if (action === "approved") {
//         bodyData = {
//           approve: true,
//           reject: false,
//           action: "approve",
//         };
//       } else if (action === "rejected") {
//         bodyData = {
//           approve: false,
//           reject: true,
//           action: "reject",
//           reason: reason,
//         };
//       }

//       const res = await fetch(
//         apiurl + "profile-change-request/superadmin-action/" + id,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(bodyData),
//         }
//       );

//       const data = await res.json();
//       if (data) {
//         alert(`Request ${action} successfully!`);
//         setShowDeclineModal(false);
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Error updating status");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!request) return <p className="text-center mt-10">Request not found</p>;

//   return (

//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-[30rem]">
//         <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//           Request Details
//         </h2>

//         <div className="space-y-3 text-gray-700">
//           {request.firstName && (
//             <p>
//               <strong>First Name:</strong> {request.firstName}
//             </p>
//           )}
//           {request.lastName && (
//             <p>
//               <strong>Last Name:</strong> {request.lastName}
//             </p>
//           )}
//           {request.email && (
//             <p>
//               <strong>Email:</strong> {request.email}
//             </p>
//           )}
//           {request.mobileNo && (
//             <p>
//               <strong>Phone:</strong> {request.mobileNo}
//             </p>
//           )}
//           {request.status && (
//             <p>
//               <strong>Status:</strong> {request.status}
//             </p>
//           )}
//           {request.requestedAt && (
//             <p>
//               <strong>Requested At:</strong>{" "}
//               {new Date(request.requestedAt).toLocaleString()}
//             </p>
//           )}
//           <p>
//             <strong>Request:</strong> Profile Change Request
//           </p>
//         </div>



//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => setShowViewModal(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
//           >
//             View Details
//           </button>
//         </div>

//         {/* Action buttons */}
//         <div className="flex justify-between mt-10">
//           <button
//             className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//             onClick={() => handleStatusChange("approved")}
//           >
//             Accept
//           </button>

//           <button
//             className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//             onClick={() => setShowDeclineModal(true)}
//           >
//             Decline
//           </button>

//           <button
//             className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </button>
//         </div>
//       </div>



//       {showViewModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[32rem] relative">
//             <h2 className="text-lg font-semibold mb-4 text-center">
//               Full Request Details
//             </h2>

//             {request.reason && (
//               <p className="mb-3">
//                 <strong>Reason:</strong> {request.reason}
//               </p>
//             )}

//             {request.editProof && (
//               <div className="mb-3">
//                 <strong>Edit Proof:</strong>{" "}
//                 <a
//                   href={`${apiurl}${request.editProof.replace(/^\/?/, "")}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline hover:text-blue-800"
//                 >
//                   View File
//                 </a>
//               </div>
//             )}

//             {request.addressProof && (
//               <div className="mb-3">
//                 <strong>Address Proof:</strong>{" "}
//                 <a
//                   href={`${apiurl}${request.addressProof.replace(/^\/?/, "")}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline hover:text-blue-800"
//                 >
//                   View File
//                 </a>
//               </div>
//             )}

//             {request.educationCertificate && (
//               <div className="mb-3">
//                 <strong>Education Certificate:</strong>{" "}
//                 <a
//                   href={`${apiurl}${request.educationCertificate.replace(/^\/?/, "")}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline hover:text-blue-800"
//                 >
//                   View File
//                 </a>
//               </div>
//             )}

//             {/* Profile View Button */}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={() => navigate("/profile")}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 View Profile
//               </button>
//             </div>

//             {/* Close Button */}
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
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[28rem] relative">
//             <h2 className="text-lg font-semibold mb-4 text-center">
//               Decline Request
//             </h2>
//             <textarea
//               className="w-full border rounded-lg p-2"
//               rows="4"
//               placeholder="Enter reason for decline..."
//               value={declineReason}
//               onChange={(e) => setDeclineReason(e.target.value)}
//             ></textarea>

//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//                 onClick={() => setShowDeclineModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                 onClick={() => handleStatusChange("rejected", declineReason)}
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

// export default SuperViewRequest;

import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { apiurl } from "../../appUrl";

const SuperViewRequest = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [request, setRequest] = useState(location.state || null);
  const [loading, setLoading] = useState(!request);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  useEffect(() => {
    fetch(apiurl + "profile-change-request/getRequestById/" + id)
      .then((res) => res.json())
      .then((data) => { 
        console.log(data);
        
        setRequest(data.request);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleStatusChange = async (action, reason = "") => {
    try {
      let bodyData = {};
      if (action === "approved") {
        bodyData = {
          approve: true,
          reject: false,
          action: "approve",
        };
      } else if (action === "rejected") {
        bodyData = {
          approve: false,
          reject: true,
          action: "reject",
          reason: reason,
        };
      }

      const res = await fetch(
        apiurl + "profile-change-request/superadmin-action/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await res.json();
      if (data) {
        alert(`Request ${action} successfully!`);
        setShowDeclineModal(false);
        
        navigate("/SuperAllrequest");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!request) return <p className="text-center mt-10">Request not found</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[30rem]">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Request Details
        </h2>

        <div className="space-y-3 text-gray-700">
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
              <strong>Phone:</strong> {request.mobileNo}
            </p>
          )}
          {request.status && (
            <p>
              <strong>Status:</strong> {request.status}
            </p>
          )}
          {request.requestedAt && (
            <p>
              <strong>Requested At:</strong>{" "}
              {new Date(request.requestedAt).toLocaleString()}
            </p>
          )}
          <p>
            <strong>Request:</strong> Profile Change Request
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowViewModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
          >
            View Details
          </button>
        </div>

        <div className="flex justify-between mt-10">
          <button
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => handleStatusChange("approved")}
          >
            Accept
          </button>

          <button
            className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => setShowDeclineModal(true)}
          >
            Decline
          </button>

          <button
            className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[32rem] relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Full Request Details
            </h2>

            {/* {request.reason && (
              <p className="mb-3">
                <strong>Reason:</strong> {request.reason}
              </p>
            )} */}

            {(request.employeeReason || request.reason) && (
  <p className="mb-3">
    <strong>Reason:</strong> {request.employeeReason || request.reason}
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
                  href={`${apiurl}${request.educationCertificate.replace(/^\/?/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View File
                </a>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Profile
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[28rem] relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Decline Request
            </h2>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="4"
              placeholder="Enter reason for decline..."
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => setShowDeclineModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleStatusChange("rejected", declineReason)}
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

export default SuperViewRequest;
