


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddTask from "./AddTask";
import { apiurl } from "../../appUrl";
import axios from "axios";

const Task = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentProject, setCurrentProject] = useState({ title: "" });
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
    const [updateDescription, setUpdateDescription] = useState("");
     const [status, setStatus] = useState("Pending");
      const [file, setFile] = useState(null);
       const [showModal, setShowModal] = useState(false);
  const [pending,setPending]=useState(false);

 const handlePendingTasks= async()=>{
setLoading(true);
 try {const res= await axios.get(`${apiurl}api/tasks/pending/${projectId}`,{withCredentials:true});
  setTasks(res.data.tasks || []);
}
catch(error)
{
  console.log("error : pending tasks unable to fetch ")
}
finally{
  setLoading(false);
}
 }

  const fetchTasks = async () => {
    // if (!token) return alert("Please login first");

    try {
      setLoading(true);
      const res = await axios.get(
        `${apiurl}api/tasks/${projectId}${
          selectedDate ? `?date=${selectedDate}` : ""
        }`,
        {
        withCredentials:"include",
        }
     
      );

      setTasks(res.data.tasks || []);

      if (res.data.tasks?.length > 0 && res.data.tasks[0].projectId?.title) {
        setCurrentProject({ title: res.data.tasks[0].projectId.title });
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  const handleAddTask = async () => {
    await fetchTasks();
    setShowAddTask(false);
  };

  
  const openViewModal = (task, emp) => {
    setCurrentTask({...task, type: emp ? "employee" : "admin"});
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
        `${apiurl}api/admin/tasks/update/${currentTask._id}`,
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
  
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 h-[70vh]">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">
          Tasks for {currentProject.title || "Project"}
        </h1>
       <div className="flex gap-3 items-center">
  <button
    onClick={() => setShowAddTask(true)}
    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
  >
    Add Task
  </button>

 {
  pending? ( <button
    onClick={() => {
      fetchTasks(); setPending(false);
    }}
    className=" bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
  >
    All Tasks
  </button>):
  ( <button
    onClick={() => {
       handlePendingTasks(); setPending(true);
    }}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
  >
    Pending Tasks
  </button>) 
 }

  <div className="flex items-center gap-2">
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="ml-2 border rounded px-2 py-1"
    />
  </div>
</div>

      </header>







      {loading ? (
        <p className="text-gray-600">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found for this project.</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Task</th>
              <th className="px-4 py-2 border">Employee(s)</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">View admin</th>
               <th className="px-4 py-2 border">View employee</th>
               <th className="px-4 py-2 border">Update task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{t.description}</td>
                <td className="px-4 py-2 border">
                  {t.employees
                    ?.map((e) => e.firstName + " " + e.lastName)
                    .join(", ")}
                </td>
                <td className="px-4 py-2 border">{t.status || "Pending"}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => openViewModal(t)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
                 <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => openViewModal(t, "employee")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
                 <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => openModal(t)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}





    
      {showViewModal && currentTask && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Task Details
            </h2>

            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Description:</span>{" "}
              {currentTask.type=="employee" ? currentTask.employeeDescription : currentTask.description || "No description available."}
            </p>
            {(currentTask.employeeFile && currentTask.type=="employee") || (currentTask.file && currentTask.type=="admin")  ? (
  <button
    onClick={() => {
    
      const fileUrl = `${apiurl}${currentTask.type==="employee" ? currentTask.employeeFile.replace(/\\/g, "/") : currentTask.file.replace(/\\/g, "/")}`;
      window.open(fileUrl, "_blank"); 
    }}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Open File
  </button>
) : (
  <p className="text-gray-500 italic mb-2">
    No file attached for this task.
  </p>
)}


            <div className="flex justify-end mt-6">
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

      {showAddTask && (
        <AddTask
          project={{ ...currentProject, _id: projectId }}
          onClose={() => setShowAddTask(false)}
          onSave={handleAddTask}
        />
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
      >
        ← Back to Projects
      </button>
    </div>
  );
};

export default Task;
