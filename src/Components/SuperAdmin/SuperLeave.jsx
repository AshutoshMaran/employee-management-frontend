import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiurl } from "../../appUrl";
import SuperLayout from "./SuperLayout";


const StatCard = ({ label, count, bgColor, textColor }) => (
    <div className={`p-4 shadow rounded ${bgColor}`}>
        <div className={`text-xl font-bold ${textColor}`}>{count}</div>
        <div className="text-gray-700">{label}</div>
    </div>
);

const SuperLeave = () => {
    const navigate = useNavigate();
    const [allLeaves, setAllLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("user");

                const response = await fetch(apiurl + "leave/all", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const resData = await response.json();
                const leaves = Array.isArray(resData) ? resData : resData.data || [];

                setAllLeaves(leaves);


                const approvedCount = leaves.filter((l) => l.status === "Approved").length;
                localStorage.setItem("onLeaveCount", approvedCount);
            } catch (err) {
                console.error("Error fetching leaves:", err);
                setError("Could not load leave data.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);


    useEffect(() => {
        const filtered = allLeaves.filter((item) => {
            const matchStatus = !statusFilter || item.status === statusFilter;
            const matchSearch =
                item.employee?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                item.leaveType?.toLowerCase().includes(searchText.toLowerCase());

            return matchStatus && matchSearch;
        });

        setFilteredLeaves(filtered);
    }, [searchText, statusFilter, allLeaves]);


    const changeStatus = (id, newStatus) => {
        setAllLeaves((prev) =>
            prev.map((item) =>
                item._id === id && item.status === "Pending"
                    ? { ...item, status: newStatus }
                    : item
            )
        );
    };


    const stats = {
        Pending: allLeaves.filter((i) => i.status === "Pending").length,
        Approved: allLeaves.filter((i) => i.status === "Approved").length,
        Rejected: allLeaves.filter((i) => i.status === "Rejected").length,
    };

    return (
        <SuperLayout>
            <div className="p-6">


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard label="Pending" count={stats.Pending} bgColor="bg-blue-100" textColor="text-blue-700" />
                    <StatCard label="Approved" count={stats.Approved} bgColor="bg-green-100" textColor="text-green-700" />
                    <StatCard label="Rejected" count={stats.Rejected} bgColor="bg-red-100" textColor="text-red-700" />
                </div>

                <h2 className="text-2xl font-semibold mb-4">Leave Management</h2>


                <div className="flex gap-4 mb-6 flex-wrap">
                    <select
                        className="border p-2 rounded"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search by name or type"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="border p-2 flex-1 min-w-[200px] rounded"
                    />
                </div>

                {loading ? (
                    <div className="text-gray-500">Loading leave data...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <div className="overflow-auto bg-white shadow rounded">
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-b from-purple-200">
                                <tr>
                                    {["Name", "Type", "From", "To", "Status", "Actions"].map((h) => (
                                        <th key={h} className="px-4 py-2 text-left">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeaves.length ? (
                                    filteredLeaves.map((leave, idx) => (
                                        <tr key={leave._id} className={idx % 2 ? "bg-gray-50" : ""}>
                                            <td className="px-4 py-2">{leave.employee?.name || "-"}</td>
                                            <td className="px-4 py-2">{leave.leaveType || "-"}</td>
                                            <td className="px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                                            <td className={`px-4 py-2 font-semibold ${leave.status === "Approved"
                                                ? "text-green-600"
                                                : leave.status === "Rejected"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                                }`}>
                                                {leave.status}
                                            </td>
                                            <td className="px-4 py-2 space-x-2">
                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                    onClick={() => changeStatus(leave._id, "Approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    onClick={() => changeStatus(leave._id, "Rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-500">
                                            No leave records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </SuperLayout>
    );
};

export default SuperLeave;
