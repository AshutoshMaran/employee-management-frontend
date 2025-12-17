

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeNavbar from "./Emp_Navbar";
import { apiurl } from "../../appUrl"; 

const Emp_Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updateDescription, setUpdateDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPending,setShowPending]= useState(false);

  const handlePendingTasks= async()=>{
 setLoading(true);
    try{
const res=await axios.get(`${apiurl}api/employee/tasks/pending`,{withCredentials:true});
setTasks(res.data.tasks || []);
    }
    catch(error)
    {
console.error("Error fetching tasks:", error);
    }
    finally {
      setLoading(false);
    }

  }

  const user = {
    name: "Mini Shrivastava",
    email: "mini@example.com",
  };

  const notifications = [
    "Task Deadline: Submit Project Report",
    "Reminder: Complete Security Training",
  ];

  
  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      // const token = localStorage.getItem("userToken");
      const res = await axios.get(apiurl + "api/employee/tasks/alltasks", {
        params: { date: selectedDate || undefined },
        withCredentials:true,
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const filteredTasks = selectedDate
    ? tasks.filter((t) => t.date.slice(0, 10) === selectedDate)
    : tasks;

  const openViewModal = (task) => {
    setCurrentTask(task);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setCurrentTask(null);
  };

  const openModal = (task) => {
    setCurrentTask(task);
    setUpdateDescription(task.description || "");
    setStatus(task.status || "Pending");
    setFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  const handleUpdate = async () => {
    if (!updateDescription || !status) {
      alert("Description and Status are mandatory.");
      return;
    }

    const formData = new FormData();
    formData.append("employeeDescription", updateDescription);
    formData.append("status", status);
    if (file) formData.append("file", file);

    try {
     
      await axios.put(
        `${apiurl}api/employee/tasks/update/${currentTask._id}`,
        formData,
        {
          headers: {
            
            "Content-Type": "multipart/form-data",
          },
          withCredentials:true,
        }
      );

      fetchTasks();
      alert("Task updated successfully!");
      closeModal();
    } catch (err) {
      console.error("Error updating task:", err);
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-blue-600 font-semibold">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
      </div>
    );
  }

  return (
    <>
      <EmployeeNavbar user={user} notifications={notifications} />

      <div className="min-h-screen bg-gray-100 p-6 pt-28">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Assigned Tasks</h1>
            <div className="flex items-center gap-2">
          {showPending?(      <button
    onClick={() => {fetchTasks();setShowPending(false)}}
    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
  >
    All Tasks
  </button>):( <button
    onClick={() => {handlePendingTasks();setShowPending(true)}}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
  >
    Pending Tasks
  </button>)}
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="border rounded px-2 py-1 text-sm"
  />

  <button
    onClick={() => fetchTasks()}
    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
  >
    Search
  </button>


</div>

          </div>

          
          <div className="grid gap-6">
            {filteredTasks?.length > 0 ? (
              filteredTasks?.map((task) => (
                <div
                  key={task?._id}
                  className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-700">
                      {task?.title || "Task"}
                    </h2>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-md ${
                        task?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : task?.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task?.status}
                    </span>
                  </div>

                 
                  <p className="text-gray-500 mb-2">
                    <span className="font-medium">Project: </span>
                    {task?.projectId?.title || "N/A"}
                  </p>

                  <p className="text-gray-600 mb-4">{task?.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openViewModal(task)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openModal(task)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No tasks found for the selected date.
              </p>
            )}
          </div>
        </div>
      </div>

     
      {showViewModal && currentTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{currentTask.title}</h2>
            <p className="text-gray-500 mb-2">
              <span className="font-medium">Project: </span>
              {currentTask.projectId?.title || "N/A"}
            </p>
            <p className="text-gray-700 mb-4">{currentTask?.description}</p>

            {currentTask.file ? (
              <button
                onClick={() =>
                  window.open(
                    currentTask.file.startsWith("http")
                      ? currentTask.file
                      : `${apiurl}${currentTask.file.replaceAll("\\", "/")}`,
                    "_blank"
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Open File
              </button>
            ) : (
              <p className="text-gray-500 italic">No file available</p>
            )}

            <div className="flex justify-end mt-5">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

     
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update Project </h2>

            <div className="mb-3">
              <label className="block font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
                rows={3}
              />
            </div>

            <div className="mb-3">
              <label className="block font-medium mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block font-medium mb-1">
                Add File (optional)
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Emp_Tasks;


