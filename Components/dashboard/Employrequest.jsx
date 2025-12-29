

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { apiurl } from "../../appUrl";

const Employrequest = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  useEffect(() => {
    fetch(apiurl + "api/admin/requests", {
     credentials:"include",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result);
        
        setRequests(result.requests || []); 
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
      });
  }, []);

  // 👁️ Function to open modal and show rejection reason
  const handleViewReason = (reason) => {
    setSelectedReason(reason || "No reason provided");
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Employee Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-blue-50 text-gray-700 text-sm font-medium">
              <th className="px-6 py-3 border border-gray-200">Employee ID</th>
              <th className="px-6 py-3 border border-gray-200">Name</th>
              <th className="px-6 py-3 border border-gray-200">Position</th>
              <th className="px-6 py-3 border border-gray-200">Department</th>
              <th className="px-6 py-3 border border-gray-200">Status</th>
              <th className="px-6 py-3 border border-gray-200">Reason</th>
            </tr>
          </thead>

          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{req.employeeId}</td>
                  <td className="px-6 py-3 capitalize">{req.name}</td>
                  <td className="px-6 py-3">{req.position}</td>
                  <td className="px-6 py-3">{req.department}</td>

                 
                  <td
                    className={`px-6 py-3 font-medium ${
                      req.status === "rejected"
                        ? "text-red-600"
                        : req.status === "approved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {req.status}
                  </td>

                  
                  <td className="px-6 py-3">
                    {req.rejectionReason ? (
                      <button
                        onClick={() => handleViewReason(req.rejectionReason)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="View Reason"
                      >
                        <Eye size={22} />
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-3 text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Reason
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap border border-gray-200 rounded-md p-3 bg-gray-50">
              {selectedReason}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employrequest;

