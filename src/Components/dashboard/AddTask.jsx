

import React, { useState, useEffect } from "react";
import { apiurl } from "../../appUrl";
import axios from "axios";

const AddTask = ({ project, onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [file, setFile] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [empLoading, setEmpLoading] = useState(false);

  // const token = localStorage.getItem("adminToken");
  // const adminId = localStorage.getItem("adminId"); 

  useEffect(() => {
    if (openDropdown && employees.length === 0) {
      fetchEmployees();
    }
  
  }, [openDropdown]);

  const fetchEmployees = async () => {
    // if (!token) return alert("Please login first");
    // if (!project || !project._id) return alert("Invalid project data");

    try {
      setEmpLoading(true);
      const res = await axios.get(
        `${apiurl}api/tasks/project/${project._id}/employees`,
        {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials:true,
        }
      );
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setEmpLoading(false);
    }
  };

  const handleDropdownToggle = () => setOpenDropdown(!openDropdown);

  const toggleEmployee = (empId) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId]
    );
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleClose = () => {
    setDescription("");
    setSelectedEmployees([]);
    setFile(null);
    setOpenDropdown(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || selectedEmployees.length === 0) {
      return alert("Please fill all fields");
    }
    // if (!token) return alert("Please login first");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("description", description);
      formData.append("projectId", project._id);
      //  if (adminId) formData.append("adminId", adminId);
      selectedEmployees.forEach((empId) =>
        formData.append("employees[]", empId)
      );
      if (file) formData.append("file", file);

      const res = await axios.post(
        `${apiurl}api/tasks/add-task`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials:true,
        }
      );

      alert("Task added successfully!");
      if (onSave) onSave(res.data);

     
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* <h2 className="text-lg font-bold mb-4">Add Task to {project?.title}</h2> */}

        <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
  <span>Add Task to {project?.title}</span>
  <span className="text-sm font-medium text-gray-600">
    {new Date().toLocaleDateString()}
  </span>
</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Task Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-2 py-1"
              rows={3}
              required
            />
          </div>

        
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Employees</label>
            <div
              onClick={handleDropdownToggle}
              className="w-full border rounded px-2 py-2 cursor-pointer bg-white"
            >
              {selectedEmployees.length > 0
                ? employees
                    .filter((emp) => selectedEmployees.includes(emp._id))
                    .map((emp) => emp.name)
                    .join(", ")
                : empLoading
                ? "Loading..."
                : "Select employees"}
            </div>

            {openDropdown && (
              <div className="absolute mt-1 w-full border rounded bg-white shadow z-10 max-h-40 overflow-y-auto">
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <label
                      key={emp._id}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(emp._id)}
                        onChange={() => toggleEmployee(emp._id)}
                        className="mr-2"
                      />
                      {emp.name} ({emp.employeeId})
                    </label>
                  ))
                ) : (
                  <p className="p-2 text-gray-500 text-sm">
                    {empLoading ? "Loading..." : "No employees available"}
                  </p>
                )}
              </div>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-medium mb-1">Attach File  (optional)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded px-2 py-1"
            />
            {file && (
              <p className="text-xs mt-1 text-gray-600">Selected: {file.name}</p>
            )}
          </div>

        
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Task"}
            </button>
          </div>
        </form>

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddTask;
