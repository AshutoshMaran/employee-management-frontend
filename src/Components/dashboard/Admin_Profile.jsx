// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaFilePdf,
//   FaFileAlt,
//   FaBriefcase,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { apiurl } from "../../appUrl";

// const Admin_Profile = () => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchProfile = async () => {
//   //     try {
//   //       const token = localStorage.getItem("userToken");
//   //       if (!token) throw new Error("Not authenticated");

//   //       const response = await axios.get(apiurl + "admin/profileUser", {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });

//   //       setAdmin(response.data.adminDetails || {});
//   //     } catch (err) {
//   //       setError(err.response?.data?.message || err.message || "Failed to load profile");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchProfile();
//   // }, []);

//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("adminToken"); 
//       console.log(token,"bhacdvhjhj");
//       if (!token) throw new Error("Not authenticated");

//       const response = await axios.get(apiurl + "api/admin/profile", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
    
      

//       setAdmin(response.data.adminDetails || response.data || {});
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchProfile();
// }, []);


//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen bg-blue-50">
//         <p className="text-blue-600 font-semibold">Loading profile...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
//         <p className="text-red-600 font-semibold mb-4">{error}</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full"
//         >
//           Go Back
//         </button>
//       </div>
//     );

//   if (!admin)
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
//         <p className="text-gray-700 font-semibold mb-4">No profile data found</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full"
//         >
//           Go Back
//         </button>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-blue-100">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <div className="flex justify-center">
//             <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
//               <FaUser className="text-blue-600 text-4xl" />
//             </div>
//           </div>
//           <h2 className="text-2xl font-bold text-blue-900 mt-3">
//             {admin.firstName} {admin.lastName}
//           </h2>
//           <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase">
//             Admin
//           </p>
//         </div>

//         {/* Profile Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//           <Detail icon={<FaEnvelope />} label="Email" value={admin.email} />
//           <Detail icon={<FaPhoneAlt />} label="Phone" value={admin.mobileNo} />
//           <Detail icon={<FaCalendarAlt />} label="Date of Joining" value={formatDate(admin.dateOfJoining)} />
//           <Detail icon={<FaMapMarkerAlt />} label="Address" value={admin.address || "Not Available"} />
//           <Detail icon={<FaBriefcase />} label="Department" value={capitalize(admin.department)} />
//         </div>

//         {/* Documents Section */}
//         <h3 className="text-lg font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
//           Documents
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FileDetail label="ID Proof" file={admin.idProof} />
//           <FileDetail label="Other Documents" file={admin.otherDocuments} multiple />
//         </div>

//         {/* Back Button */}
//         <div className="flex justify-center mt-12">
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Detail = ({ icon, label, value }) => (
//   <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
//     <div className="text-blue-600 text-xl">{icon}</div>
//     <div>
//       <p className="text-blue-900 font-semibold">{label}</p>
//       <p className="text-gray-700">{value || "N/A"}</p>
//     </div>
//   </div>
// );

// const FileDetail = ({ label, file, multiple }) => {
//   const files = multiple ? file || [] : file ? [file] : [];
//   return (
//     <div className="flex flex-col bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
//       <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
//         <FaFilePdf /> {label}
//       </div>
//       {files.length > 0 ? (
//         files.map((f, i) => (
//           <a
//             key={i}
//             href={f.startsWith("http") ? f : `/files/${f}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 text-sm hover:underline"
//           >
//             <FaFileAlt className="inline mr-1" /> {f.split("/").pop()}
//           </a>
//         ))
//       ) : (
//         <p className="text-gray-500 text-sm">No files uploaded</p>
//       )}
//     </div>
//   );
// };

// function formatDate(dateStr) {
//   if (!dateStr) return "N/A";
//   const date = new Date(dateStr);
//   return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
// }

// function capitalize(str) {
//   return str ? str.charAt(0).toUpperCase() + str.slice(1) : "N/A";
// }

// export default Admin_Profile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFilePdf,
  FaFileAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../../appUrl";

const Admin_Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const token = localStorage.getItem("adminToken");
        // if (!token) throw new Error("Not authenticated");

        const response = await axios.get(`${apiurl}api/admin/profile`, {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },withCredentials:true,
        });

       
        setAdmin(response.data.admin || {});
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-blue-50">
        <p className="text-blue-600 font-semibold">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    );

  if (!admin)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-blue-50">
        <p className="text-gray-700 font-semibold mb-4">No profile data found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-blue-100">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-200">
              <FaUser className="text-blue-600 text-4xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mt-3">
            {admin.adminName || "N/A"}
          </h2>
          <p className="text-blue-600 text-sm font-semibold tracking-wide uppercase">
            Admin
          </p>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Detail icon={<FaEnvelope />} label="Email" value={admin.adminEmail} />
          <Detail icon={<FaPhoneAlt />} label="Phone" value={admin.mobileNo} />
          <Detail icon={<FaCalendarAlt />} label="Date of Joining" value={formatDate(admin.dateOfJoining)} />
          <Detail icon={<FaMapMarkerAlt />} label="Address" value={admin.address} />
          <div className="col-span-2">
          <Detail icon={<FaGraduationCap />} label="Education" value={admin.education} />

          </div>
        </div>

      
        <h3 className="text-lg font-semibold text-blue-800 mb-4 border-b border-blue-200 pb-2">
          Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileDetail label="Education Certificate" file={admin.educationCert} />
          <FileDetail label="Address Proof" file={admin.addressProof} />
        </div>

        
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};


const Detail = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
    <div className="text-blue-600 text-xl">{icon}</div>
    <div>
      <p className="text-blue-900 font-semibold">{label}</p>
      <p className="text-gray-700">{value || "N/A"}</p>
    </div>
  </div>
);

const FileDetail = ({ label, file }) => (
  <div className="flex flex-col bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
    <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
      <FaFilePdf /> {label}
    </div>
    {file ? (
      <a
        href={file.startsWith("http") ? file : `/files/${file}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm hover:underline"
      >
        <FaFileAlt className="inline mr-1" /> {file.split("/").pop()}
      </a>
    ) : (
      <p className="text-gray-500 text-sm">No file uploaded</p>
    )}
  </div>
);


function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
}

export default Admin_Profile;
