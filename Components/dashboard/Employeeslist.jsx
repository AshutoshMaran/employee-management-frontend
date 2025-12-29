import React, { useState, useEffect } from "react";
import Updateform from "./Updateform";
import View from "./View";
import { apiurl } from "../../appUrl";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus, Search } from "lucide-react";

const Employeeslist = () => {
  const [mainData, setMainData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateEmployee, setUpdateEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [sortt, setSortt] = useState("");
  const [sortedData, setSortedData] = useState([]);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage,setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    if (sortt === "ascId") {
      let sorted = [...mainData].sort((a, b) =>
        a.employeeId.localeCompare(b.employeeId)
      );
      console.log("sorted data is = ", sorted);
      setSortedData(sorted);
    } else if (sortt === "decId") {
      let sorted = [...mainData].sort((a, b) =>
        b.employeeId.localeCompare(a.employeeId)
      );
      console.log("sorted data is = ", sorted);
      setSortedData(sorted);
    } else if (sortt === "ascName") {
      let sorted = [...mainData].sort((a, b) => a.name.localeCompare(b.name));
      console.log("sorted data is = ", sorted);
      setSortedData(sorted);
    } else if (sortt === "decName") {
      let sorted = [...mainData].sort((a, b) => b.name.localeCompare(a.name));
      console.log("sorted data is = ", sorted);
      setSortedData(sorted);
    } else if (sortt === "ascPosition") {
      let sorted = [...mainData].sort((a, b) =>
        a.position.localeCompare(b.position)
      );
      console.log("sorted data is = ", sorted);
      setSortedData(sorted);
    } else if (sortt === "decPosition") {
      let sorted = [...mainData].sort((a, b) =>
        b.position.localeCompare(a.position)
      );
      console.log("sorted data is = ", sortt);
      setSortedData(sorted);
    } else if (sortt === "ascDepartment") {
      
      let sorted = [...mainData].sort((a, b) =>
        a.department.localeCompare(b.department)
      );
      console.log("sorted data is = ", sorted);
      setSortedData(sorted);
    } else if (sortt === "decDepartment") {
      let sorted = [...mainData].sort((a, b) =>
        b.department.localeCompare(a.department)
      );
      console.log("sorted data is = ", sorted);
      setSortedData(sorted);
    }
    console.log(sortt);
    
  }, [sortt]);

  // Fetch employees once
  useEffect(() => {
    loadEmployees();
  }, []);

  // Fetch function
  const loadEmployees = async () => {
    try {
      const res = await fetch(apiurl + "employeesAdmin", {
        credentials: "include",
      });

      if(res.status===405){navigate('/admin')};
      const result = await res.json();
      const data = result.data || [];
      setMainData(data);
      setFilteredData(data);
    } catch (e) {
      console.error("Failed to fetch employees:", e);
    }
  };

  // Handle search filtering
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(sortedData);
    } else {
      const filtered = mainData.filter((emp) => {
        const name = emp.name?.toLowerCase() || "";
        const position = emp.position?.toLowerCase() || "";
        const department = emp.department?.toLowerCase() || "";
        const employeeId = emp.employeeId?.toLowerCase() || "";

        return (
          name.includes(searchTerm.toLowerCase()) ||
          position.includes(searchTerm.toLowerCase()) ||
          department.includes(searchTerm.toLowerCase()) ||
          employeeId.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1); // reset to first page after search
    }
  }, [searchTerm, sortedData]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle update
  const handleSubmit = (updatedEmp) => {
    setMainData((prev) =>
      prev.map((e) =>
        e.id === updatedEmp.id || e.emp_id === updatedEmp.emp_id
          ? updatedEmp
          : e
      )
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex">
      <div className="p-8 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            👥 Employee Overview
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/emp-request")}
              className="flex-items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Request
            </button>
            <button
              onClick={() => navigate("/add-employee")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Plus size={18} />
              Add Employee
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-6">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Table */}
        <div
          key={currentPage}
          className="overflow-x-auto transition-opacity duration-500 ease-in-out opacity-100 animate-fade"
        >
          <div className="flex flex-col gap-4">
            {/* Header Row */}
            <div className="flex text-gray-700 font-semibold text-center select-none">
              {/* {["Employee ID", "Name", "Position", "Department", "Actions"].map(
                (head, i) => (
                 
                )
              )} */}
              <div
                className={`flex-1 text-black font-bold bg-blue-100 px-6 py-3 border border-blue-300
                      rounded-l-xl border-r-0  `}
              >
                <div className="flex items-center">
                  <span>Employee Id</span>
                  <div className="flex flex-col ml-2 leading-tight">
                    <span
                      onClick={() => setSortt("ascId")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "ascId" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
    }`}
                    >
                      ▲
                    </span>
                    <span
                      onClick={() => setSortt("decId")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "decId" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
    }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex-1 text-black font-bold bg-blue-100 px-6 py-3 border border-blue-300
                     `}
              >
                <div className="flex items-center">
                  <span>Name</span>
                  <div className="flex flex-col ml-2 leading-tight">
                    <span
                      onClick={() => setSortt("ascName")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "ascName" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
    }`}
                    >
                      ▲
                    </span>
                    <span
                      onClick={() => setSortt("decName")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "decName" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
    }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex-1 text-black font-bold bg-blue-100 px-6 py-3 border border-blue-300
                     `}
              >
                <div className="flex items-center">
                  <span>Position</span>
                  <div className="flex flex-col ml-2 leading-tight">
                    <span
                      onClick={() => setSortt("ascPosition")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "ascPosition"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                    >
                      ▲
                    </span>
                    <span
                      onClick={() => setSortt("decPosition")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "decPosition"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex-1 text-black font-bold bg-blue-100 px-6 py-3 border border-blue-300
                     `}
              >
                <div className="flex items-center">
                  <span>Department</span>
                  <div className="flex flex-col ml-2 leading-tight">
                    <span
                      onClick={() => setSortt("ascDepartment")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "ascDepartment"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                    >
                      ▲
                    </span>
                    <span
                      onClick={() => setSortt("decDepartment")}
                      className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortt === "decDepartment"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`flex-1 text-black font-bold bg-blue-100 px-6 py-3 rounded-r-xl4 border border-blue-300
                     `}
              >
                Actions
              </div>
            </div>

            {/* Data Rows */}
            {currentItems.length > 0 ? (
              currentItems.map((emp) => (
                <div
                  key={emp.id || emp.employeeId}
                  className="flex items-center gap-0"
                >
                  <div className="flex-1 bg-blue-50 rounded-l-xl px-6 py-4 border border-blue-200 text-center border-r-0 text-sm font-medium text-gray-700">
                    {emp.employeeId || emp.id}
                  </div>
                  <div className="flex-1 bg-blue-50 px-6 py-4 border text-center border-blue-200 border-r-0 text-sm">
                    {emp.name}
                  </div>
                   <div className="flex-1 bg-blue-50 px-6 py-4 border text-center border-blue-200 border-r-0 text-sm">
                    {emp.position}
                  </div>
                  <div className="flex-1 bg-blue-50 px-6 py-4 border text-center border-blue-200 border-r-0 text-sm">
                    {emp.department}
                  </div>
                 
                  
                  <div className="flex-1 bg-blue-100 rounded-r-xl px-6 py-4 border border-blue-300 text-sm text-center font-semibold text-blue-700">
                    <div className="flex justify-center gap-3">
                      <button
                        className="flex items-center gap-1 bg-blue-500/90 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow hover:bg-green-600 transition"
                        onClick={() => {
                          setView(emp);
                          setViewOpen(true);
                        }}
                      >
                        <Eye size={16} />
                        View
                      </button>

                      {emp.updateRequestStatus === "requested" ? (
                        <button
                          disabled
                          className="flex items-center gap-1 bg-yellow-300 text-yellow-800 text-xs font-medium px-3 py-1.5 rounded-lg shadow cursor-not-allowed"
                        >
                          Requested
                        </button>
                      ) : emp.updateRequestStatus === "approved" ? (
                        <button
                          onClick={() =>
                            navigate(`/edit-approved-form/${emp._id}`)
                          }
                          className="flex items-center gap-1 bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow hover:bg-green-600 transition"
                        >
                          Edit (Approved)
                        </button>
                      ) : ""
                      // ( 
                      //   <button
                      //     onClick={() => navigate(`/updateform/${emp._id}`)}
                      //     className="flex items-center gap-1 bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow hover:bg-yellow-600 transition"
                      //   >
                      //     <Pencil size={16} />
                      //     Edit
                      //   </button>
                      // )
                      }
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10 w-full">
                No employees found.
              </div>
            )}
          </div>
        </div>

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
      </div>

      {/* Modals */}
      {open && (
        <Updateform
          LoadEmployees={loadEmployees}
          initialData={updateEmployee}
          onClose={() => setOpen(false)}
          onSubmit={(data) => {
            handleSubmit(data);
            setOpen(false);
          }}
        />
      )}

      {viewOpen && view && (
        <View employee={view} onClose={() => setViewOpen(false)} />
      )}
    </div>
  );
};

export default Employeeslist;
