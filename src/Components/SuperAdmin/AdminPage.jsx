import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperLayout from "./SuperLayout";
import { apiurl } from "../../appUrl";
  import { Trash2 } from "lucide-react"; 
import axios from "axios";
import Swal from 'sweetalert2';



const AdminPage = () => {
  const [adminList, setAdminList] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const [formData, setFormData] = useState({
    adminId: "",
    adminName: "",
    adminEmail: "",
    mobileNo: "",
    dateOfJoining: "",
    education: "",
    educationCert: null,
    address: "",
    addressProof: null,
  });

  const navigate = useNavigate();
  // const token = localStorage.getItem("user");       //Super_Admin Token

  // useEffect(() => {
  //   if (!token) {
  //     alert("Please login as Super Admin first!");
  //     navigate("/superadminlogin");
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    // if (token)
     fetchAdmins();
  }, []); 

  const fetchAdmins = async () => {
      try {
        const response = await fetch(`${apiurl}api/admin/all`, {
          method: "GET",
          // headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        if (!response.ok){
          alert("Please login as Super Admin first!");
          navigate("/superadminlogin");
        } 
        const result = await response.json();
        setAdminList(result.admins);
        
      } catch (err) {
        console.error(err);
        alert("Failed to load admins");
      }
    };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleDelete = async (admin)=>
  {
    try
    {
      const res=await axios.put(`${apiurl}api/admin/remove/${admin._id}`,{show:!admin.show},{withCredentials:true,});

    console.log("Admin removed successfully",res.data);
    fetchAdmins();
  }catch(error)
  {
     console.error("Error removing admin:", error);
  }
   
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      const response = await fetch(`${apiurl}api/admin/add`, {
        method: "POST",
        // headers: { Authorization: `Bearer ${token}` },
        credentials:"include",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to add admin");

      const result = await response.json();
      console.log("Admin added:", result);

      setAdminList((prev) => [...prev, result.admin]);

      setFormData({
        adminId: "",
        adminName: "",
        adminEmail: "",
        mobileNo: "",
        dateOfJoining: "",
        education: "",
        educationCert: null,
        address: "",
        addressProof: null,
      });

      setShowModal(false);
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin. Please try again.");
    }
  };

  return (
    <SuperLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Admin
          </button>
        </div>

        {adminList.length === 0 ? (
          <p>No admins added yet.</p>
        ) : (
          <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden mb-10">
  <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
    <tr>
      <th className="py-3 px-4 text-left font-semibold">ID</th>
      <th className="py-3 px-4 text-left font-semibold">Name</th>
      <th className="py-3 px-4 text-left font-semibold">Mobile</th>
      <th className="py-3 px-4 text-center font-semibold">Action</th>
    </tr>
  </thead>

  <tbody>
    {adminList.map((admin, index) => (
      <tr
        key={index}
        className="border-b border-gray-200 hover:bg-blue-50 transition duration-150"
      >
        <td className="py-3 px-4 text-gray-700">{admin.adminId}</td>
        <td className="py-3 px-4 text-gray-700">{admin.adminName}</td>
        <td className="py-3 px-4 text-gray-700">{admin.mobileNo}</td>

        {/* ✅ Centered Delete Button */}
        <td className="py-3 px-4">







          <div className="flex justify-center items-center">

  {/* Toggle Switch */}
  <div
    onClick={() =>
      Swal.fire({
        title: `${admin.show?"Disable":"Enable"}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Proceed!"
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(admin);
        }
      })
    }
    className={`${admin.show ? "bg-green-500" : "bg-gray-500"}  w-12 h-6 rounded-full flex items-center cursor-pointer shadow-inner relative transition`}
    title="Delete Admin"
  >
    <div className={` ${admin.show ? "left-[50%]" : "left-1"} w-5 h-5 bg-white rounded-full shadow-md absolute transition-all`}></div>
  </div>

</div>

          {/* <div className="flex justify-center items-center">
            <button
              onClick={() =>  Swal.fire({
title:  "Delete?",
   
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Proceed!"
  }).then((result) => {
    if (result.isConfirmed) {
   handleDelete(admin._id);
  }

})}
              className="flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition cursor-pointer shadow-sm"
              title="Delete Admin"
            >
              <Trash2 size={16} />
            </button>
          </div> */}
        </td>
      </tr>
    ))}
  </tbody>
</table>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
              <h2 className="text-xl font-bold mb-4">Add Admin</h2>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="adminId"
                  value={formData.adminId}
                  onChange={handleChange}
                  placeholder="Admin ID"
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="Admin Name"
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  placeholder="Admin Email"
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Education"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="file"
                  name="educationCert"
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
                  type="file"
                  name="addressProof"
                  onChange={handleChange}
                  placeholder="Address Proof"
                  className="w-full border p-2 rounded"
                />

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SuperLayout>
  );
};

export default AdminPage;
