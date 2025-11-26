

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperLayout from "./SuperLayout";
import { apiurl } from "../../appUrl";
import {Search} from "lucide-react";

const SuperProject = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ totalProjects: 0, openProjects: 0, closedProjects: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [employeeModal, setEmployeeModal] = useState({ open: false, projectIdx: null });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [searchTerm,setSearchTerm]=useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const [rowsPerPage, setRowsPerPage] = useState(10);
      const indexOfLastItem = currentPage * rowsPerPage;
      const indexOfFirstItem = indexOfLastItem - rowsPerPage;
      const totalPages = Math.ceil(projects.length / rowsPerPage);
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiurl + "api/projects/getallproject", {method: "GET",
        credentials:"include",
       });
      // if (!response.status!=200 || !response.status==304) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.projects || []);
      setStats(data.stats || { totalProjects: 0, openProjects: 0, closedProjects: 0 });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      // const adminId = localStorage.getItem("adminId");
      // const token = localStorage.getItem("adminToken");
       
      //  if (!adminId || !token) {
    
      // setLoadingEmployees(false);
      // return;
    // }


      const response = await fetch(apiurl + "auth/getEmployeeList", {
  // headers: { Authorization: `Bearer ${token}` },
  credentials:"include",
});
// if (!response.ok) throw new Error("Failed to fetch employees");
const data = await response.json();

const simplified = (data.data || []).map((emp) => ({
  _id: emp._id,
  name: emp.name,
  employeeId: emp.employeeId,
  role: emp.role || "developer",
}));

setEmployeesList(simplified);


      setEmployeesList(simplified);
    } catch (err) {
      console.error(err);
      // setError("Failed to fetch employees");
    } finally {
      setLoadingEmployees(false);
    }
  };

 
  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);
      const response = await fetch(apiurl + "api/projects/employees/roles", {
      });
      if (!response.ok) throw new Error("Failed to fetch roles");
      const data = await response.json();
      setRolesList(data.roles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRoles(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees(); 
    fetchRoles();  
  }, []);

  const handleAddEmployee = (idx) => {
    const assignedEmployees = projects[idx].assignedEmployees || [];
    setEmployeeModal({ open: true, projectIdx: idx });

 
    const selectedIds = assignedEmployees.map((e) => e.employeeDbId._id);
    setSelectedEmployees(selectedIds);

    setEmployeesList((prev) =>
      prev.map((emp) => {
        const assigned = assignedEmployees.find((a) => a.employeeDbId._id === emp._id);
        return assigned ? { ...emp, role: assigned.role } : emp;
      })
    );
  };

  const toggleEmployee = (empId) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId) ? prev.filter((id) => id !== empId) : [...prev, empId]
    );
  };

  
  const saveEmployees = async () => {
    try {
      const updatedProjects = [...projects];
      const project = updatedProjects[employeeModal.projectIdx];
        const newEmplist = selectedEmployees.filter((item)=>employeesList.some((emp)=>emp._id==item))
      const bodyData = {
        projectId: project._id,
        employeeIds: newEmplist.map((id) => {
          const emp = employeesList.find((e) => e._id === id);
          if(emp){
          return { _id: emp._id, role: emp.role===""?"developer":emp.role};
          }
        
        }),
        // adminId: localStorage.getItem("adminId"),
      };

      const response = await fetch(apiurl + "api/projects/SuperAdmin/assign-employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        credentials:"include",
      });

      if (!response.ok) throw new Error("Failed to update employees on server");
      await response.json();

      
      project.assignedEmployees = selectedEmployees
        .map((id) => {
          const emp = employeesList.find((e) => e._id === id);
          return emp
            ? {
                _id: id,
                employeeDbId: { _id: emp._id, employeeId: emp.employeeId, firstName: emp.name, lastName: "" },
                role: emp.role,
              }
            : null;
        })
        .filter(Boolean);

      setProjects(updatedProjects);
      setEmployeeModal({ open: false, projectIdx: null });
    } catch (err) {
      console.error(err);
      alert("Failed to save employees");
    }
  };


  const filteredProjects = projects.filter((project) => {

  const admin = project.admin?._id?.toLowerCase() || "";
  const name = project.admin?.name?.toLowerCase() || "";
  const email = project.admin?.email?.toLowerCase() || "";
  const title = project.title?.toLowerCase() || "";
  
  // Handle technologies as array or string
  const technologies = Array.isArray(project.technologies)
    ? project.technologies.join(", ").toLowerCase()
    : project.technologies?.toLowerCase() || "";
  
  const status = project.status?.toLowerCase() || "";

  // 🟢 Handle assignedEmployees as array
  let employeeId = "";
  let firstName = "";
  let lastName = "";
  let role = "";

  if (Array.isArray(project.assignedEmployees)) {
    // concatenate all employee info into strings to match with search term
    employeeId = project.assignedEmployees
      .map((emp) => emp.employeeDbId?.employeeId?.toLowerCase() || "")
      .join(" ");
    firstName = project.assignedEmployees
      .map((emp) => emp.employeeDbId?.firstName?.toLowerCase() || "")
      .join(" ");
    lastName = project.assignedEmployees
      .map((emp) => emp.employeeDbId?.lastName?.toLowerCase() || "")
      .join(" ");
    role = project.assignedEmployees
      .map((emp) => emp.role?.toLowerCase() || "")
      .join(" ");
  } else if (project.assignedEmployees) {
    // if not array
    employeeId = project.assignedEmployees.employeeDbId?.employeeId?.toLowerCase() || "";
    firstName = project.assignedEmployees.employeeDbId?.firstName?.toLowerCase() || "";
    lastName = project.assignedEmployees.employeeDbId?.lastName?.toLowerCase() || "";
    role = project.assignedEmployees.role?.toLowerCase() || "";
  }

  const createdAt = new Date(project.createdAt).toLocaleDateString().toLowerCase();
  const updatedAt = new Date(project.updatedAt).toLocaleDateString().toLowerCase();

  return (
    admin.includes(searchTerm.toLowerCase()) ||
    name.includes(searchTerm.toLowerCase()) ||
    email.includes(searchTerm.toLowerCase()) ||
    title.includes(searchTerm.toLowerCase()) ||
    technologies.includes(searchTerm.toLowerCase()) ||
    status.includes(searchTerm.toLowerCase()) ||
    employeeId.includes(searchTerm.toLowerCase()) ||
    firstName.includes(searchTerm.toLowerCase()) ||
    lastName.includes(searchTerm.toLowerCase()) ||
    role.includes(searchTerm.toLowerCase()) ||
    createdAt.includes(searchTerm.toLowerCase()) ||
    updatedAt.includes(searchTerm.toLowerCase())
  );
}).slice(indexOfFirstItem, indexOfLastItem);


const handlePrev=()=>{
  setCurrentPage((prev)=>Math.max(prev-1,1));
}

const handleNext=()=>{
  setCurrentPage((next)=>Math.min(next+1,totalPages));
}

const handlePageChange=(pageNumber)=>{
  setCurrentPage(pageNumber);
}




  
  return (
    <SuperLayout>
      <div className="p-6 w-full">
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg shadow text-center bg-blue-100">
            <div className="text-blue-600 text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <div className="mt-2 text-black font-medium">Total Projects</div>
          </div>
          <div className="p-6 rounded-lg shadow text-center bg-green-100">
            <div className="text-green-600 text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold">{stats.openProjects}</div>
            <div className="mt-2 text-black font-medium">Opened Projects</div>
          </div>
          <div className="p-6 rounded-lg shadow text-center bg-yellow-100">
            <div className="text-yellow-600 text-3xl mb-2">⚠️</div>
            <div className="text-2xl font-bold">{stats.closedProjects}</div>
            <div className="mt-2 text-black font-medium">Closed Projects</div>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button
            onClick={() => navigate("/superproject/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            + Add New Project
          </button>
          
        </div>
      

      <div className="relative max-w-md mb-5">
  <input
    type="text"
    placeholder="Search projects...."
    value={searchTerm}
    onChange={(e) =>{ setSearchTerm(e.target.value);setCurrentPage(1)}}
    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
  <Search
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    size={18}
  />
</div>



        {loading ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : projects.length === 0 || filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : filteredProjects.length > 0?(<div   key={currentPage} className="grid gap-6  transition-opacity duration-500 ease-in-out opacity-100 animate-fade">
            {filteredProjects.map((project, idx) => (
              <div 
              
                key={project._id || idx ||currentPage}
                className={`${project.status=="in-progress"?"bg-white":project.status=="opening"?"bg-green-100":"bg-yellow-100"} p-5 rounded-lg shadow hover:shadow-lg transition flex flex-col md:flex-row justify-between`}              >
                <div className="flex flex-col md:flex-1">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  <div className="mt-3 flex gap-10 flex-wrap">
                    <p className="text-sm">

                      <strong>Technologies:</strong> {project.technologies?.join(", ")}
                    </p>
                    <p className="text-sm">
                      <strong>Admin:</strong> {project.adminId || project.admin?.email}
                    </p>
                    <p className="text-sm">
                      <strong>Status:</strong> {project.status || "opening"}
                    </p>
                  </div>
                  {project.assignedEmployees && project.assignedEmployees.length > 0 && (
                    <div className="mt-2 text-sm text-left">
                      <strong>Employees:</strong>{" "}
                      {project.assignedEmployees
                        .map(
                          (e) =>
                            `${e?.employeeDbId?.firstName} ${e?.employeeDbId?.lastName} (${e?.role || "Developer"})`
                        )
                        .join(",")}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
               
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 h-fit"
                    onClick={() => handleAddEmployee(idx)}
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            ))}
          </div>):(
          <div className="grid gap-6">
            {projects.map((project, idx) => (
              <div 
              
                key={project._id || idx}
                className={`${project.status=="in-progress"?"bg-white":project.status=="opening"?"bg-green-100":"bg-yellow-100"} p-5 rounded-lg shadow hover:shadow-lg transition flex flex-col md:flex-row justify-between`}              >
                <div className="flex flex-col md:flex-1">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  <div className="mt-3 flex gap-10 flex-wrap">
                    <p className="text-sm">

                      <strong>Technologies:</strong> {project.technologies?.join(", ")}
                    </p>
                    <p className="text-sm">
                      <strong>Admin:</strong> {project.adminId || project.admin?.email}
                    </p>
                    <p className="text-sm">
                      <strong>Status:</strong> {project.status || "opening"}
                    </p>
                  </div>
                  {project.assignedEmployees && project.assignedEmployees.length > 0 && (
                    <div className="mt-2 text-sm text-left">
                      <strong>Employees:</strong>{" "}
                      {project.assignedEmployees
                        .map(
                          (e) =>
                            `${e?.employeeDbId?.firstName} ${e?.employeeDbId?.lastName} (${e?.role || "Developer"})`
                        )
                        .join(", ")}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
               
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 h-fit"
                    onClick={() => handleAddEmployee(idx)}
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
         }

          <style>
          {`
@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade {
  animation: fade 0.4s ease-in-out;
}
`}
        </style>


               <div className="flex flex-col justify-center items-center gap-3 py-8">
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 ">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm
        ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-purple-600"
        }`}
            >
              Prev
            </button>

        {/* Page Numbers */}
            <div className="flex items-center gap-2">
  
         <select   onChange={({ target }) =>{ setRowsPerPage(target.value); setCurrentPage(1)}}
              value={rowsPerPage}   className="
    w-32 px-4 py-2
    text-sm font-semibold
    text-gray-700 bg-white
    border border-gray-300
    rounded-xl shadow-sm
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
    hover:border-indigo-400 hover:shadow-md
    cursor-pointer
    appearance-none
    bg-[url('data:image/svg+xml;utf8,<svg fill=\'%236366f1\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')]
    bg-no-repeat bg-right-3 bg-center
  ">


{[10,50,100].map((num)=>(<option value={num}
 className="text-gray-800 font-medium bg-white">
  rows {num}
</option>))}
       </select>

            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-sm
        ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-purple-600"
        }`}
            >
              Next
            </button>
          </div>
        </div>
        
        
        {employeeModal.open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg  w-[600px] h-[60vh] p-10 relative overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Assign Employees</h2>
              <div className="max-h-64 overflow-y-auto">
                {loadingEmployees || loadingRoles ? (
                  <p>Loading...</p>
                ) : (
                  employeesList.map((emp) => (
                    <div key={emp._id} className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(emp._id)}
                          onChange={() => toggleEmployee(emp._id)}
                        />
                        <span>
                          {emp.name} ({emp.employeeId})
                        </span>
                      </div>

                      {selectedEmployees.includes(emp._id) && (
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={emp.role || (rolesList[0] || "")}
                          onChange={(e) =>
                            setEmployeesList((prev) =>
                              prev.map((item) =>
                                item._id === emp._id ? { ...item, role: e.target.value } : item
                              )
                            )
                          }
                        >
                          {rolesList.map((role) => (
                            <option key={role} value={role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEmployeeModal({ open: false, projectIdx: null })}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={saveEmployees}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperLayout>
  );
};

export default SuperProject;



