

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// import { apiurl } from "../../appUrl";
// import EmployeeNavbar from "./Emp_Navbar";

// const EmpProjectTask = () => {
//   const { projectId } = useParams();
//   const [tasks, setTasks] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  
//   const [showModal, setShowModal] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [updateDescription, setUpdateDescription] = useState("");
//   const [status, setStatus] = useState("Pending");
//   const [file, setFile] = useState(null);

 
//   const fetchTasks = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem("userToken");
//       if (!token) throw new Error("User not authenticated. Please login.");

//       const res = await axios.get(
//         `${apiurl}api/employee/tasks/project/${projectId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { date: selectedDate || undefined },
//         }
//       );

//       setTasks(res.data.tasks || []);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to fetch tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [projectId]);

  
//   const openModal = (task) => {
//     setCurrentTask(task);
//     setUpdateDescription(task.employeeUpdate || task.description || "");
//     setStatus(task.status || "Pending");
//     setFile(null);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setCurrentTask(null);
//   };

  
//   const handleUpdate = async () => {
//     if (!updateDescription || !status) {
//       alert("Description and Status are mandatory.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("userToken");
//       const formData = new FormData();
//       formData.append("description", updateDescription);
//       formData.append("status", status);
//       if (file) formData.append("file", file);

//       await axios.put(
//         `${apiurl}api/employee/tasks/update/${currentTask._id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Task updated successfully!");
//       closeModal();
//       fetchTasks(); 
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to update task");
//     }
//   };

//   if (loading) return <p>Loading tasks...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <>
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Your Project Tasks</h1>

//         <div className="flex items-center gap-2">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="border rounded px-2 py-1 text-sm"
//           />
//           <button
//             onClick={fetchTasks}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {tasks.length > 0 ? (
//         <table className="w-full border-collapse border border-gray-300 mb-6">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left">Project Title</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//               <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task._id} className="hover:bg-gray-50">
//                 <td className="border border-gray-300 px-4 py-2">{task.projectId?.title || "N/A"}</td>
//                 <td className="border border-gray-300 px-4 py-2">{task.description || "No description"}</td>
//                 <td className="border border-gray-300 px-4 py-2">{task.status || "Pending"}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <button
//                     onClick={() => openModal(task)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
//                   >
//                     Update
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-gray-500 italic">No tasks found.</p>
//       )}

      
//       {showModal && currentTask && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Update Task</h2>

//             <div className="mb-3">
//               <label className="block font-medium mb-1">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={updateDescription}
//                 onChange={(e) => setUpdateDescription(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-2 py-1"
//                 rows={3}
//               />
//             </div>

//             <div className="mb-3">
//               <label className="block font-medium mb-1">
//                 Status <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="w-full border border-gray-300 rounded px-2 py-1"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>

//             <div className="mb-3">
//               <label className="block font-medium mb-1">Attach File (optional)</label>
//               <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full" />
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <button onClick={closeModal} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Cancel</button>
//               <button onClick={handleUpdate} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Update</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default EmpProjectTask;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../../appUrl";
import EmployeeNavbar from "./Emp_Navbar";

const EmpProjectTask = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [updateDescription, setUpdateDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [file, setFile] = useState(null);

  // 🔹 Get user info for Navbar
  const userName = localStorage.getItem("userName") || "Unknown User";
  const userEmail = localStorage.getItem("userEmail") || "unknown@example.com";
  const user = { name: userName, email: userEmail };

  // 🔹 Dummy notifications (optional)
  const notifications = [
    "New update from HR team",
    "Your project deadline is near!",
  ];

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      // const token = localStorage.getItem("userToken");
      // if (!token) throw new Error("User not authenticated. Please login.");

      const res = await axios.get(
        `${apiurl}api/employee/tasks/project/${projectId}`,
        {
          // headers: { Authorization: `Bearer ${token}` },
          params: { date: selectedDate || undefined },
          withCredentials:true,
        }
      );

      setTasks(res.data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const openModal = (task) => {
    setCurrentTask(task);
    setUpdateDescription(task.employeeUpdate || task.description || "");
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

    try {
      // const token = localStorage.getItem("userToken");
      const formData = new FormData();
      formData.append("employeeDescription", updateDescription);
      formData.append("status", status);
      if (file) formData.append("file", file);

      await axios.put(
        `${apiurl}api/employee/tasks/update/${currentTask._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },withCredentials:true,
        }
      );

      alert("Task updated successfully!");
      closeModal();
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar added here */}
      <EmployeeNavbar user={user} notifications={notifications} />

      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Project Tasks</h1>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={fetchTasks}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Filter
            </button>
          </div>
        </div>

        {tasks.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Project Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{task.projectId?.title || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.description || "No description"}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.status || "Pending"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => openModal(task)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 italic">No tasks found.</p>
        )}

        {/* 🔹 Modal for Update */}
        {showModal && currentTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Update Task</h2>

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
                <label className="block font-medium mb-1">Attach File (optional)</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full" />
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
      </main>
    </div>
  );
};

export default EmpProjectTask;
