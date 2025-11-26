import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaIdBadge,
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaFilePdf,
  FaFileArchive,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../../appUrl";

const My_Profile = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseFileUrl = "/files";

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        // const token = localStorage.getItem("userToken");
        // if (!token) {
        //   throw new Error("User not authenticated");
        // }

        const response = await axios.get(
          apiurl + "profile/profileUser",
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
            withCredentials:true,
          }
        );
        console.log("res", response);


        const userData = response.data.employeeDetails;
        setEmployee(userData);
        // setFullName(employee.firstName + employee.lastName)
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || err.message || "Failed to load profile");
      } finally {
        console.log("dsfds");
        
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-600 font-semibold">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center px-4">
          <p className="text-red-600 font-semibold mb-4">Error: {error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-700 font-semibold mb-4">No user data found.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-blue-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-10 tracking-wider">
          Employee Profile
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Detail icon={<FaIdBadge />} label="Employee ID" value={employee.employeeId} />
          <Detail icon={<FaUser />} label="Name" value={`${employee.firstName} ${employee.lastName}`} />
          <Detail icon={<FaCalendarAlt />} label="Date of Joining" value={formatDate(employee.dateOfJoining)} />
          <Detail icon={<FaEnvelope />} label="Email" value={employee.email} />
          <Detail icon={<FaPhone />} label="Phone" value={employee.mobileNo} />
        </div>

        <hr className="my-10 border-gray-300" />


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Detail icon={<FaBriefcase />} label="Department" value={capitalize(employee.department)} />
          <Detail icon={<FaBriefcase />} label="Position" value={capitalize(employee.position)} />
          <Detail icon={<FaGraduationCap />} label="Education" value={formatEducation(employee.education)} />
          <Detail icon={<FaMapMarkerAlt />} label="Address" value={employee.address} />
        </div>

        <hr className="my-10 border-gray-300" />


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileDetail
            icon={<FaFilePdf />}
            label="Education Certificate"
            file={employee.educationCertificate}
          // baseUrl={baseFileUrl}
          />
          <FileDetail
            icon={<FaFilePdf />}
            label="Address Proof"
            file={employee.addressProof}
          // baseUrl={baseFileUrl}
          />
          <FileDetail
            icon={<FaFileArchive />}
            label="Other Documents"
            file={employee.OtherDocuments}
            // baseUrl={baseFileUrl}
            multiple
          />
        </div>


        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-full transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};



const Detail = ({ icon, label, value }) => (
  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl shadow-sm border">
    <div className="text-blue-600 text-xl mt-1">{icon}</div>
    <div>
      <p className="text-blue-900 font-semibold">{label}</p>
      <p className="text-gray-700 mt-1">{value?.toString() || "N/A"}</p>
    </div>
  </div>
);

const FileDetail = ({ icon, label, file, baseUrl = "", multiple = false }) => {
  let files = [];

  if (multiple && Array.isArray(file)) {
    files = file;
  } else if (file) {
    files = [file];
  }

  return (  
    <div className="flex flex-col space-y-2 p-4 bg-blue-50 rounded-xl shadow-sm border">
      <div className="flex items-center space-x-3">
        <div className="text-blue-600 text-xl">{icon}</div>
        <p className="text-blue-900 font-semibold">{label}</p>
      </div>
      <div className="ml-7 mt-1 flex flex-col space-y-1">

        {files.length > 0 ? (
          files.map((f, idx) => {

            const isFullUrl = typeof f === "string" && f.startsWith("http");


            const fileUrl = isFullUrl ? f : `${baseUrl}/${f}`;

            return (
              <a
                key={idx}
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {typeof f === "string" ? f.split("/").pop() : f.name || "Document"}
              </a>
            );
          })
        ) : (
          <span className="text-gray-700">N/A</span>
        )}
      </div>
    </div>
  );
};



function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "N/A";
}

function formatEducation(edu) {
  switch (edu) {
    case "highschool":
      return "High School";
    case "bachelor":
      return "Bachelor's";
    case "master":
      return "Master's";
    default:
      return edu || "N/A";
  }
}

export default My_Profile;
