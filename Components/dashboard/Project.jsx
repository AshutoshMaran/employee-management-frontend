import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../../appUrl";
import axios from "axios";
import {Search} from "lucide-react";

const Project = () => {
  const navigate = useNavigate();

  const [projectsData, setProjectsData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectStatuses, setProjectStatuses] = useState({});

  const [stats, setStats] = useState({
    totalProjects: 0,
    openProjects: 0,
    closedProjects: 0,
  });

  const [employeeModal, setEmployeeModal] = useState({
    open: false,
    projectIdx: null,
  });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState({});
 const [currentPage, setCurrentPage] = useState(1);
      const [rowsPerPage, setRowsPerPage] = useState(10);
      const indexOfLastItem = currentPage * rowsPerPage;
      const indexOfFirstItem = indexOfLastItem - rowsPerPage;
      const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
      const [searchTerm,setSearchTerm]=useState("");


  // ---------------- FETCH PROJECTS ----------------
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiurl + "api/projects/admin/projects", {
          credentials: "include",
        });

         if(response.status===405) navigate('/admin');
        if (!response.ok){ throw new Error("Failed to fetch projects");}
       

        let data = await response.json();
        let allProjects = data.projects || [];

        // format members
        allProjects = allProjects.map((p) => ({
          ...p,
          teamMembers:
            p.teamMembers?.map((e) => ({
              id: e._id || e.id,
              name: e.name,
              role: e.role || "Developer",
            })) || [],
        }));

        setProjectsData(allProjects);

        console.log(`these are the projects data ${projectsData}`);
        setFilteredProjects(allProjects);

        setStats(
          data.stats || {
            totalProjects: allProjects.length,
            openProjects: 0,
            closedProjects: 0,
          }
        );
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);



  const SearchedProjects = filteredProjects?.filter((project) => {

  console.log(`filter ${filteredProjects}`);

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
});



const handlePrev=()=>{
  setCurrentPage((prev)=>Math.max(prev-1,1));
}

const handleNext=()=>{
  setCurrentPage((next)=>Math.min(next+1,totalPages));
}

const handlePageChange=(pageNumber)=>{
  setCurrentPage(pageNumber);
}



  // ---------------- FETCH STATUS FOR EACH PROJECT ----------------
  const fetchStatus = async (projectId) => {
    try {
      const res = await axios.get(`${apiurl}api/tasks/status/${projectId}`, {
        withCredentials: true,
      });

      setProjectStatuses((prev) => ({
        ...prev,
        [projectId]: res.data.status,
      }));
    } catch (error) {
      console.error("Error fetching project status:", error);
      setProjectStatuses((prev) => ({
        ...prev,
        [projectId]: "Error",
      }));
    }
  };









  useEffect(() => {
    if (filteredProjects.length > 0) {
      filteredProjects.forEach((p) => fetchStatus(p._id));
    }
  }, [filteredProjects]);

  // ---------------- FETCH EMPLOYEES ----------------
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const response = await fetch(apiurl + "auth/getEmployeeList", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch employees");

      const data = await response.json();
      const simplified = (data.data || []).map((emp) => ({
        _id: emp._id,
        name: emp.name,
        employeeId: emp.employeeId,
        role: emp.role || "developer",
      }));

      setEmployeesList(simplified);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // ---------------- FETCH ROLES ----------------
  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);
      const response = await fetch(apiurl + "api/projects/employees/roles");
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
    fetchRoles();
  }, []);

  // ---------------- MODALS HANDLERS ----------------
  const openModal = (proje) => {
    setCurrentProject(proje);
    setShowModal(true);
  };

  const handleAddEmployee = async (idx) => {
 try{
   const assignedEmployees = projectsData[idx].assignedEmployees.map((item) => item) || [];
    setEmployeeModal({ open: true, projectIdx: idx });


    const selectedIds = assignedEmployees.map((e) => e.employeeDbId._id);
    setSelectedEmployees(selectedIds);


    await fetchEmployees();
    setEmployeesList((prev) =>
      prev.map((emp) => {
        const assigned = assignedEmployees.find(
          (a) => a.employeeDbId._id === emp._id
        );
        return assigned ? { ...emp, role: assigned.role } : emp;
      })
    );
 }
 catch(error){
  console.log(`error:${error}`);
 }
  };

  const toggleEmployee = (empId) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId]
    );
  };

  const saveEmployees = async () => {
    try {
      const updatedProjects = [...projectsData];
      const project = updatedProjects[employeeModal.projectIdx];
        const newEmplist = selectedEmployees.filter((item)=>employeesList.some((emp)=>emp._id==item))
      const bodyData = {
        projectId: project._id,
        employeeIds: newEmplist.map((id) => {
          const emp = employeesList.find((e) => e._id === id);
          return { _id: emp._id, role: emp.role || "Developer" };
        }),
      };

      const response = await fetch(
        apiurl + "api/projects/admin/assign-employees",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to save employees");
      await response.json();

      project.teamMembers = selectedEmployees
        .map((id) => {
          const emp = employeesList.find((e) => e._id === id);
          return emp ? { id: emp._id, name: emp.name, role: emp.role } : null;
        })
        .filter(Boolean);

      setProjectsData(updatedProjects);
      setFilteredProjects(updatedProjects);
      setEmployeeModal({ open: false, projectIdx: null });
    } catch (err) {
      console.error(err);
      alert("Failed to save employees");
    }
  };

  // ---------------- UPDATE PROJECT STATUS ----------------
  const handleUpdate = async () => {
    try {
      const resp = await axios.put(
        apiurl + "api/projects/admin/update-project-status",
        { status: currentProject.status, projectId: currentProject._id },
        { withCredentials: true }
      );

      if (!resp) console.log("resp not fetched ");
      alert("Project status updated successfully");
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- UI ----------------
  if (loading)
    return (
      <div className="p-6 text-blue-600 text-center">Loading projects...</div>
    );
  if (error)
    return <div className="p-6 text-red-600 text-center">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Projects</h1>
        <p className="text-gray-600 mt-1">Overview of project statuses</p>
      </header>

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

      
      <div className="relative max-w-md mb-5">
  <input
    type="text"
    placeholder="Search projects...."
    value={searchTerm}
    onChange={(e) => {setSearchTerm(e.target.value)}}
    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
  <Search
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    size={18}
  />
</div>


      <section className="grid gap-6  transition-opacity duration-500 ease-in-out opacity-100 animate-fade"   key={currentPage}>
        {SearchedProjects.length>0?(SearchedProjects.slice(indexOfFirstItem, indexOfLastItem).map((project, idx) => (
          <div
            key={project._id}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition flex flex-col md:flex-row justify-between"
          >
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600"><ShowMoreBox description={project.description}/></p>

              <div className="mt-3 flex gap-20 flex-wrap">
                <p className="text-sm">
                  <strong>Technologies:</strong>{" "}
                  {project.technologies?.join(", ")}
                </p>
                {/* <p className={`text-sm  ${
            projectStatuses[project._id] == "In-Progress"
              ? "text-yellow-600": "text-green-600"}`}>
                  <strong>Status:</strong>{" "}
                  {projectStatuses[project._id] || "Loading..."}
                </p> */}
              </div>

              {project.assignedEmployees &&
                project.assignedEmployees.length > 0 && (
                  <p className="mt-1 text-sm">
                    <strong>Employees:</strong>{" "}
                    {project.assignedEmployees
                      .map(
                        (e) => `${e?.employeeDbId?.firstName} (${e.role})`
                      )
                      .join(", ")}
                  </p>
                )}
            </div>

            <div className="flex flex-col mt-4 md:mt-0 md:ml-6 ">
              <div className="flex items-center space-x-3 mb-3">
                {/* <button
                  onClick={() => openModal(project)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Update Status
                </button> */}

                <button
                  onClick={() => navigate(`/tasks/${project._id}`)}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-10 py-1.5 ml-[9px] rounded-md shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 "
                >
                  Tasks
                </button>
              </div>

              <button
                onClick={() => handleAddEmployee(idx)}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 pl-4"
              >
                Add Employee
              </button>
            </div>
          </div>
        ))):(
          <p className="text-gray-500">No projects found.</p>
        )}
        
               <div className="flex flex-col justify-center items-center gap-3 py-8">
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3">
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
      </section>


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





      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Update Project Status
            </h2>

            <div className="mb-3">
              <label className="block font-medium mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={currentProject.status}
                onChange={(e) =>
                  setCurrentProject((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="opening">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="closing">Closed</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
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
    </div>
  );
};

const ShowMoreBox=({description=""})=>{
  const [minShow,setMinShow]=useState(40);
  return(
  <div>
<span>{description.slice(0, minShow)} {minShow<description.length ? <button className="text-blue-600 font-medium hover:underline flex items-center gap-1 mt-1" onClick={()=>setMinShow(description.length)}>Show More</button> : 40<description.length?<button  className="text-blue-600 font-medium hover:underline flex items-center gap-1 mt-1" onClick={()=>setMinShow(40)}>Show Less</button>:""}</span>
  </div>)
}

export default Project;
