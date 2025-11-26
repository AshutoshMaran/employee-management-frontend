

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../../appUrl";

const AllRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiurl + "profile-change-request/requests?status=requested")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.requests.map((item) => ({
          id: item._id,
          firstName: item.employeeDbId?.firstName || "",
          lastName: item.employeeDbId?.lastName || "",
          email: item.employeeDbId?.email || "",
          phone: item.employeeDbId?.mobileNo || "",
          requestStatus: item.status, 
        }));
        setRequests(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Requests</h2>

      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{req.firstName}</td>
              <td className="border px-4 py-2">{req.lastName}</td>
              <td className="border px-4 py-2">{req.email}</td>
              <td className="border px-4 py-2">{req.phone}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => navigate(`/requests/${req.id}`, { state: req })}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRequest;
