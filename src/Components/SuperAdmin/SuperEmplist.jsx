import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search,Plus, Pen } from "lucide-react";
import SuperLayout from "./SuperLayout";
import View from "../dashboard/View";
import { apiurl } from "../../appUrl";
import { set } from "react-hook-form";


const SuperEmplist = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewEmployee, setViewEmployee] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const [sortId, setSortId] = useState("");
  const [sortedId, setSortedId] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (sortId === "asc") {
      let sorted = employees.sort((a, b) =>
        a.employeeId.localeCompare(b.employeeId)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "dec") {
      let sorted = employees.sort((a, b) =>
        b.employeeId.localeCompare(a.employeeId)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "ascName") {
      let sorted = employees.sort((a, b) => a.name.localeCompare(b.name));
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "decName") {
      let sorted = employees.sort((a, b) => b.name.localeCompare(a.name));
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "ascPosition") {
      let sorted = employees.sort((a, b) =>
        a.position.localeCompare(b.position)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "decPosition") {
      let sorted = employees.sort((a, b) =>
        b.position.localeCompare(a.position)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "ascDepartment") {
      let sorted = employees.sort((a, b) =>
        a.department.localeCompare(b.department)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "decDepartment") {
      let sorted = employees.sort((a, b) =>
        b.department.localeCompare(a.department)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "ascTime") {
      let sorted = employees.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    } else if (sortId === "decTime") {
      let sorted = employees.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedId(sorted);
      console.log("this data is sorted ", sorted);
    }
  }, [sortId]);

  useEffect(() => {
    loadEmployees();
  }, []);

  // 🔹 Load all employees initially
  const loadEmployees = async () => {
    try {
      const res = await fetch(apiurl + "superadmin/employees", {
        credentials: "include",
      });
      const result = await res.json();
      if (Array.isArray(result.data)) {
        setEmployees(result.data);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Failed to load employees:", error);
    }
  };

  // 🔹 Update employee status
  const updateStatus = async (empId, status) => {
    try {
      const res = await fetch(apiurl + "updateEmployeeStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ employeeId: empId, status }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(`Employee ${status} successfully.`);
        loadEmployees();
      } else {
        alert(result.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 🔹 Search filter
  const filteredEmployees = (sortId.length > 0 ? sortedId : employees)
    .filter((emp) => {
      const name = emp.name?.toLowerCase() || "";
      const dept = emp.department?.toLowerCase() || "";
      const pos = emp.position?.toLowerCase() || "";
      const empId = emp.employeeId?.toString() || "";
      //  console.log(empId);
      return (
        name.includes(searchTerm.toLowerCase()) ||
        dept.includes(searchTerm.toLowerCase()) ||
        pos.includes(searchTerm.toLowerCase()) ||
        empId.includes(searchTerm)
      );
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  // 🔹 Date filter logic
  useEffect(() => {
    fetchEmployeeByDate();
  }, [selectedDate]);

  const fetchEmployeeByDate = async () => {
    try {
      const response = await fetch(
        `${apiurl}superadmin/employees${
          selectedDate ? `?date=${selectedDate}` : ""
        }`,
        { credentials: "include" }
      );

      const result = await response.json();
      if (Array.isArray(result.data)) {
        setEmployees(result.data);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Failed to load employees:", error);
    }
  };

  // 🔹 Convert and format UTC date to IST
  const formatISTDateTime = (utcDateString) => {
    if (!utcDateString) return "N/A";
    const date = new Date(utcDateString);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-IN", options);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((next) => Math.min(next + 1, totalPages));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SuperLayout>
      <div className="w-full min-h-screen bg-gray-50 p-0 ">
        <div className="mb-6 flex  justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Employee List</h1>
            <div className="flex items-center gap-4">
         
            <button
              onClick={() => navigate("/add-employee-super")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Plus size={18} />
              Add Employee
            </button>
          </div>
        </div>

        {/* 🔹 Search & Date Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1)}}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ml-2 border rounded px-3 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 🔹 Employee Table */}
        <div
          key={currentPage || sortId}
          className="w-full max-h-[65vh] overflow-auto rounded-lg shadow bg-white transition-opacity duration-500 ease-in-out opacity-100 animate-fade"
        >
          <table className="table-auto w-full text-sm text-left border-collapse">
            <thead className="bg-purple-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 border-b text-left">
                  <div className="flex items-center">
                    <span>Employee ID</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("asc")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "asc" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▲
                      </span>

                      <span
                        onClick={() => setSortId("dec")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "dec" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>

                <th className="px-4 py-3 border-b text-left">
                  <div className="flex items-center">
                    <span>Name</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("ascName")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "ascName"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▲
                      </span>
                      <span
                        onClick={() => setSortId("decName")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "decName"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 border-b text-left">
                  <div className="flex items-center">
                    <span>Position</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("ascPosition")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "ascPosition"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▲
                      </span>
                      <span
                        onClick={() => setSortId("decPosition")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "decPosition"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 border-b text-left">
                  <div className="flex items-center">
                    <span>Department</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("ascDepartment")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "ascDepartment"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▲
                      </span>
                      <span
                        onClick={() => setSortId("decDepartment")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "decDepartment"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 border-b text-left">
                  <div className="flex items-center">
                    <span>Date & Time</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("ascTime")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "ascTime"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▲
                      </span>
                      <span
                        onClick={() => setSortId("decTime")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${
      sortId === "decTime"
        ? "text-gray-400 cursor-not-allowed"
        : "text-blue-600"
    }`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.employeeId}
                    className={`${emp.updateRequestStatus==="approved"?"bg-green-100":emp.updateRequestStatus==="none"?"bg-yellow-100":"bg-red-200"}`}
                  >
                    <td className="px-4 py-3">{emp.employeeId}</td>
                    <td className="px-4 py-3">{emp.name}</td>
                    <td className="px-4 py-3">{emp.position}</td>
                    <td className="px-4 py-3">{emp.department}</td>

                    {/* 🔹 Proper Date Formatting */}
                    <td className="px-4 py-1">
                      <div className="text-gray-800 font-medium">
                        {formatISTDateTime(emp.createdAt).split(",")[0]}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {formatISTDateTime(emp.createdAt)
                          .split(",")
                          .slice(1)
                          .join(",")}
                      </div>
                    </td>

                    {/* 🔹 Action Buttons */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate("/superview", { state: { employee: emp } })
                          }
                          className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-600"
                        >
                          <Eye size={16} /> View
                        </button>

                        {/* <button
                          onClick={() =>
                            navigate("/superedit/:notificationId/:employeeId")
                          }
                          className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-green-700"
                        >
                          Edit Request
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

              <div className="flex flex-col justify-center items-center gap-3 py-8 ">
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
        

        {/* 🔹 View Component */}
        <View
          employee={viewEmployee}
          onClose={() => setOpenView(false)}
          onApprove={() => updateStatus(viewEmployee?._id, "approved")}
          onReject={() => updateStatus(viewEmployee?._id, "rejected")}
          isSuperAdmin={true}
        />
      </div>
    </SuperLayout>
  );
};

export default SuperEmplist;
