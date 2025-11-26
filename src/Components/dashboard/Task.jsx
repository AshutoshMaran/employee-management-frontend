


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
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
        
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
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

          <div className="flex items-center gap-2">
            {/* <button
              onClick={fetchTasks}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Calendar
            </button> */}
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
