import React, { useEffect, useState } from 'react';
import Card from '../dashboard/Card';
import Piechart from '../dashboard/Piechart';
import { apiurl } from '../../appUrl';
import { Search } from "lucide-react";
const SuperEmpOverview = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [empl, setEmpl] = useState([])
  const [cardData, setCardData] = useState({
    total: 0,
    active: 0,
    onLeave: 0,
    inactive: 0,
  });

  const [searchTerm,setSearchTerm]=useState("");
  const [selectedDate, setSelectedDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const totalPages = Math.ceil(employees.length / rowsPerPage);

      const [sortId, setSortId] = useState("");
      const [sortedId, setSortedId] = useState([]);

  const API_URL = apiurl + '';



    useEffect(() => {
      
      if (sortId === "ascName") {
        let sorted = [...employees].sort((a, b) => a.name.localeCompare(b.name));
        setSortedId(sorted);
        console.log("this data is sorted ", sorted);
      } else if (sortId === "decName") {
        let sorted = [...employees].sort((a, b) => b.name.localeCompare(a.name));
        setSortedId(sorted);
        console.log("this data is sorted ", sorted);
      } else if (sortId === "ascPosition") {
        let sorted = [...employees].sort((a, b) =>
          a.position.localeCompare(b.position)
        );
        setSortedId(sorted);
        console.log("this data is sorted ", sorted);
      } else if (sortId === "decPosition") {
        let sorted = [...employees].sort((a, b) =>
          b.position.localeCompare(a.position)
        );
        setSortedId(sorted);
        console.log("this data is sorted ", sorted);
      } else if (sortId === "ascDepartment") {
        let sorted =[...employees].sort((a, b) =>
          a.department.localeCompare(b.department)
        );
        setSortedId(sorted);
        console.log("this data is sorted ", sorted);
      } else if (sortId === "decDepartment") {
        let sorted = [...employees].sort((a, b) =>
          b.department.localeCompare(a.department)
        );
        setSortedId(sorted);
        console.log("this data is sorted ", sorted);
      }
    }, [sortId]);


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





useEffect(() => {
  const loadEmployees = async () => {
    // const token = localStorage.getItem("user");
    // if (!token) {
    //   setError("No token found. Please login again.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const res = await fetch(apiurl + "employees", {
        // headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const result = await res.json();
      console.log("API Response:", result);

      if (res.ok) {
        const data = Array.isArray(result.data) ? result.data : [];
        setEmployees(data);   
        setLoading(false);
      } else {
        setError("Failed to load employees");
        setLoading(false);
      }
    } catch (e) {
      console.error("Failed to fetch employees:", e);
      setError("Something went wrong while fetching employees");
      setLoading(false);
    }
  };

  loadEmployees();
}, []);


const handlePrev=()=>{

  setCurrentPage((prev)=>Math.max(prev-1,1));

}


const handleNext=()=>{

  setCurrentPage((next)=>Math.min(next+1,totalPages));
}


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };






  if (loading) return <div className="p-6">Loading employees...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 w-full">
   
      <Card data={cardData} setData={setCardData} />

      <h2 className="text-2xl font-semibold mb-6 mt-8 text-gray-800">Employee Overview</h2>


   {/* 🔹 Search & Date Filter */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value), setCurrentPage(1)}}
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



     
      <div key={currentPage} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8  transition-opacity duration-500 ease-in-out opacity-100 animate-fade ">
       
        <div className="bg-white shadow rounded-lg p-6 overflow-auto max-h-[500px]">
          <table className="w-full text-left min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 fixed-sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 border-b border-gray-300">
                   <div className="flex items-center">
                    <span>Name</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("ascName")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "ascName" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▲
                      </span>

                      <span
                        onClick={() => setSortId("decName")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "decName" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▼
                      </span>
                    </div>
                  </div></th>
                <th className="px-6 py-3 border-b border-gray-300">
                   <div className="flex items-center">
                    <span>Position</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("ascPosition")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "ascPosition" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▲
                      </span>

                      <span
                        onClick={() => setSortId("decPosition")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "decPosition" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                   <div className="flex items-center">
                    <span>Department</span>
                    <div className="flex flex-col ml-2 leading-tight">
                      <span
                        onClick={() => setSortId("ascDepartment")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "ascDepartment" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▲
                      </span>

                      <span
                        onClick={() => setSortId("decDepartment")}
                        className={`text-[10px] mb-0 cursor-pointer 
    ${sortId === "decDepartment" ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredEmployees.length > 0?(filteredEmployees.map((emp, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-3 border-b border-gray-200">{emp.name || 'N/A'}</td>
                  <td className="px-6 py-3 border-b border-gray-200">{emp.position || 'N/A'}</td>
                  <td className="px-6 py-3 border-b border-gray-200">{emp.department || 'N/A'}</td>
                </tr>
              ))):(
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
        {/* <select
  onChange={({ target }) => handlePageChange(target.value)}
  value={currentPage}
  className="
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
  "
>
  {Array.from({ length: totalPages }, (_, index) => (
    <option
      key={index}
      value={index + 1}
      className="text-gray-800 font-medium bg-white"
    >
      Page {index + 1}
    </option>
  ))}
</select> */}


              {/* {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-full font-medium transition-all duration-300 transform
            ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 hover:scale-105"
            }`}
                >
                  {index + 1}
                </button>
              ))} */}

{
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
}


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



          






        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
          <h5 className="text-lg font-semibold text-gray-800 mb-4">Employee Status Breakdown</h5>
          <Piechart data={cardData} />
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


      
    </div>
  );
};

export default SuperEmpOverview;
