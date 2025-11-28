

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperLayout from "./SuperLayout";
import { apiurl } from "../../appUrl";

const AddProjectForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: Date.now(),
    title: "",
    description: "",
    startDate: "",
    technologies: [],
    adminId: "",
  });

  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [adminList, setAdminList] = useState([]);

  const toggleTechDropdown = () => setTechDropdownOpen(!techDropdownOpen);

  const handleTechSelect = (tech) => {
    if (formData.technologies.includes(tech)) {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((t) => t !== tech),
      });
    } else {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tech],
      });
    }
  };

  
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
      
        const response = await fetch(apiurl + "api/admin/list", {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, 
          },
          credentials:"include",
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Failed to fetch admin list");
        }

        const data = await response.json();
        setAdminList(data.admins || []);
      } catch (error) {
        console.error("Error fetching admins:", error);
        setMessage(" " + error.message);
      }
    };

    fetchAdmins();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // const token = localStorage.getItem("user");
      // if (!token) throw new Error("No token found");

      const response = await fetch(apiurl + "api/projects/superadminaddproject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
        credentials:"include",
      });

      if (!response.ok) {
        const errorRes = await response.json();
        throw new Error(errorRes.message || "Failed to add project");
      }

      const result = await response.json();

      setMessage(" Project added successfully!");
      setTimeout(() => navigate("/superproject", { state: { newProject: result.project } }), 1500);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.message || "Something went wrong while adding the project!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SuperLayout>
      <div className="max-w-3xl mx-auto  p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.startsWith("")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div>
            <label className="block font-medium mb-1">Project Title</label>
            <input
              type="text"
              placeholder="Enter Project Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

        
          <div>
            <label className="block font-medium mb-1">Project Description</label>
            <textarea
              placeholder="Enter Project Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

        
          <div className="w-full">
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
          </div>

        
          <div>
            <label className="block font-medium mb-1">Technologies</label>
            <div className="relative">
              <div
                onClick={toggleTechDropdown}
                className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white"
              >
                {formData.technologies.length > 0
                  ? formData.technologies.join(", ")
                  : "Select Technologies"}
              </div>

              {techDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-40 overflow-y-auto">
                  {["React", "NodeJS", "Flutter", "Java", "Python"].map(
                    (tech) => (
                      <div
                        key={tech}
                        onClick={() => handleTechSelect(tech)}
                        className={`px-3 py-2 cursor-pointer hover:bg-blue-100 flex items-center ${
                          formData.technologies.includes(tech)
                            ? "bg-blue-200 font-semibold"
                            : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.technologies.includes(tech)}
                          readOnly
                          className="mr-2"
                        />
                        {tech}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          
          <div>
            <label className="block font-medium mb-1">Assign Admin</label>
            <select
              value={formData.adminId}
              onChange={(e) =>
                setFormData({ ...formData, adminId: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Admin</option>
              {adminList.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.adminName || admin.name || "Unnamed Admin"}
                </option>
              ))}
            </select>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded`}
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>
    </SuperLayout>
  );
};

export default AddProjectForm;
