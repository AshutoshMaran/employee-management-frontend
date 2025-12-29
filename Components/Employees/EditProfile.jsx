

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { apiurl } from "../../appUrl";
import EmployeeNavbar from "./Emp_Navbar";
const EditProfile = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
    addressProof: null,
    educationCertificate: null,
    editProof: null,
    reason: "",
  });
  // const token = localStorage.getItem("userToken")
  // const userId = localStorage.getItem("userId")
  // console.log("userID", userId)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(apiurl + "profile/profileUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             },credentials:"include",
          });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const { employeeDetails: data } = await response.json();
        console.log(data);

        setFormData({
          ...data,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.mobileNo || "",
          address: data.address || "",
          password: "",

          confirmPassword: "",
          profilePic: data.profilePic || null,
          addressProof: data?.addressProof || null,
          educationCertificate: data.educationCertificate || null,
        });

        setPreview(data.profilePic || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, [name]: reader.result, file:file });
          if (name === "profilePic") setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setFormData({ ...formData, [name]: value, file:file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
       const formDataToSend = new FormData();

  // Append text fields
  formDataToSend.append("firstName", formData.firstName);
  formDataToSend.append("_id", formData._id);
  formDataToSend.append("employeeId", formData.employeeId);
  formDataToSend.append("lastName", formData.lastName);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("mobileNo", formData.phone);
  formDataToSend.append("reason", formData.reason);
  formDataToSend.append("address", formData.address);
  formDataToSend.append("password", formData.password || "");

      
  if (formData.profilePic) formDataToSend.append("profilePic", formData.profilePic);
  if (formData.addressProof) formDataToSend.append("addressProof", formData.addressProof);
  if (formData.editProof) formDataToSend.append("file", formData.file);
  if (formData.educationCertificate)
    formDataToSend.append("educationCertificate", formData.educationCertificate);

  const response = await fetch(apiurl + "profile-change-request/request-update", {
    method: "POST",
    body: formDataToSend, 
    
  });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log("Profile updated:", data);

      alert("Profile updated successfully!");
      navigate(-1);
    } catch (error) {
      if (error.response) {
        const data = await error.response.json()
        console.log(data);

      }
      console.log("Error updating profile:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
   <EmployeeNavbar/>
    <div className="min-h-screen bg-blue-50 px-4 py-8 flex items-center justify-center">
      
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 relative">
        <button
          className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800 transition"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="mr-1" />
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {preview && (
            <div className="flex justify-center mb-4">
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-full border-2 border-blue-400"
              />
            </div>
          )}



          <div>
            <label className="block text-sm font-semibold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              last name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Optional"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Address Proof
            </label>
            <div className="flex items-center gap-3 mt-1">
              
              <input
                type="file"
                name="addressProof"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                className="hidden"
                id="addressProofInput"
              />


              <label
                htmlFor="addressProofInput"
                className="cursor-pointer bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Choose File
              </label>


              {formData?.addressProof ? (
                <a
                  href={formData?.addressProof}
                  target="_blank"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-blue-600 hover:underline text-sm truncate"
                  title={formData?.addressProof?.split("/").pop()}
                >
                  {formData?.addressProof?.split("/").pop()}
                </a>
              ) : (
                <span className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600">
                  No filechoosen
                </span>
              )}
            </div>
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Education Certificate
            </label>
            <div className="flex items-center gap-3 mt-1">
          
              <input
                type="file"
                name="educationCertificate"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                className="hidden"
                id="educationCertificateInput"
              />

             
              <label
                htmlFor="educationCertificateInput"
                className="cursor-pointer bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Choose File
              </label>

              
              {formData?.educationCertificate ? (
                <a
                  href={formData.educationCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-blue-600 hover:underline text-sm truncate"
                  title={formData?.educationCertificate?.split("/").pop()}
                >
                  {formData?.educationCertificate?.split("/").pop()}
                </a>
              ) : (
                <span className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600">
                  No file choosen
                </span>
              )}
            </div>
          </div>
                    <div>
            <label className="block text-sm font-semibold text-gray-700">
              Edit Proof File
            </label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="file"
                name="editProof"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
                className="hidden"
                id="editProofInput"
              />
              <label
                htmlFor="editProofInput"
                className="cursor-pointer bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Choose File
              </label>

              {formData.editProof ? (
                <span className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-blue-600 text-sm truncate">
                  {typeof formData.editProof === "string"
                    ? formData.editProof.split("/").pop()
                    : "File selected"}
                </span>
              ) : (
                <span className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600">
                  No filechoosen
                </span>
              )}
            </div>
          </div>
                     <div>
            <label className="block text-sm font-semibold text-gray-700">
              Reason for Profile Edit
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter your reason for updating profile..."
              rows="3"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>


          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditProfile;

