
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAdminForm = ({ addAdmin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminId: "",
    adminName: "",
    adminEmail: "",
    mobileNo: "",
    dateOfJoining: "",
    education: "",
    educationCert: "",
    address: "",
    addressProof: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let admins = JSON.parse(localStorage.getItem("admins") || "[]");
    admins.push(formData);
    localStorage.setItem("admins", JSON.stringify(admins));
    navigate("/admin"); 
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="adminId"
          value={formData.adminId}
          onChange={handleChange}
          placeholder="Admin ID"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
          placeholder="Admin Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="adminEmail"
          type="email"
          value={formData.adminEmail}
          onChange={handleChange}
          placeholder="Admin Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="mobileNo"
          type="number"
          value={formData.mobileNo}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="dateOfJoining"
          type="date"
          value={formData.dateOfJoining}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Education"
          className="w-full border p-2 rounded"
        />
        <input
          name="educationCert"
          value={formData.educationCert}
          onChange={handleChange}
          placeholder="Education Certification"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        <input
          name="addressProof"
          value={formData.addressProof}
          onChange={handleChange}
          placeholder="Address Proof"
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;
