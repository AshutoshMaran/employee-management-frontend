import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../../appUrl";

const Leave = () => {
  const navigate = useNavigate();
  const [dataLeave, setDataLeave] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaveData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");

      const response = await fetch(apiurl + "auth/leave/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const leaves = Array.isArray(data) ? data : data.data || [];
      setDataLeave(leaves);

  
      const onLeaveCount = leaves.filter((l) => l.status === "Approved").length;
      localStorage.setItem("onLeaveCount", onLeaveCount);
    } catch (err) {
      console.error("Error fetching leave data:", err);
      setError("Failed to load leave data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  useEffect(() => {
    const filtered = dataLeave.filter((item) => {
      const matchesStatus = !statusFilter || item.status === statusFilter;
      const matchesSearch =
        item.employee?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.leaveType?.toLowerCase().includes(searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    setDisplayData(filtered);
  }, [searchText, statusFilter, dataLeave]);

  const updateStatus = (id, newStatus) => {
    setDataLeave((prev) =>
      prev.map((item) =>
        item._id === id && item.status === "Pending" ? { ...item, status: newStatus } : item
      )
    );
  };

  const counts = {
    pending: dataLeave.filter((i) => i.status === "Pending").length,
    approved: dataLeave.filter((i) => i.status === "Approved").length,
    rejected: dataLeave.filter((i) => i.status === "Rejected").length,
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
        
          label="Pending"
          count={counts.pending}
          bgColor="bg-blue-100"
          textColor="text-blue-700"
        />
        <StatCard
      
          label="Approved"
          count={counts.approved}
          bgColor="bg-green-100"
          textColor="text-green-700"
        />
        <StatCard
       
          label="Rejected"
          count={counts.rejected}
          bgColor="bg-red-100"
          textColor="text-red-700"
        />
      </div>

      <h1 className="text-2xl mb-4">Leave Management</h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          className="border p-2 flex-1 min-w-[200px] rounded"
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/recall")}
        >
          Leave Recall
        </button> */}
      </div>

      <div className="overflow-auto bg-white shadow rounded">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {["Name", "Type", "From", "To", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length ? (
              displayData.map((row, idx) => (
                <tr key={row._id || idx} className={idx % 2 ? "bg-gray-50" : ""}>
                  <td className="px-4 py-2">{row.employee?.name || ""}</td>
                  <td className="px-4 py-2">{row.leaveType || ""}</td>
                  <td className="px-4 py-2">{new Date(row.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(row.endDate).toLocaleDateString()}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      row.status === "Approved"
                        ? "text-green-600"
                        : row.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {row.status || "Pending"}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        onClick={() => updateStatus(row._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        onClick={() => updateStatus(row._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const StatCard = ({ emoji, label, count, bgColor, textColor }) => (
  <div className={`p-4 flex items-center shadow rounded ${bgColor}`}>
    <span className={`text-3xl mr-4 ${textColor}`}>{emoji}</span>
    <div>
      <div className={`text-xl font-bold ${textColor}`}>{count}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  </div>
);

export default Leave;
