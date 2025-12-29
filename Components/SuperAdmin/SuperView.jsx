import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import SuperLayout from "./SuperLayout";
import { apiurl } from "../../appUrl";

const SuperView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(
    employee?.updateRequestStatus || "none"
  );
  console.log(employee.updateRequestStatus);
  
  const [reason, setReason] = useState("");

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-800">
            No employee data found.
          </h2>
          <button
            onClick={() => navigate("/superemplist")}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // ✅ Fetch reason for rejection
  const handleReason = async () => {
    try {
      const res = await axios.get(
        `${apiurl}superadmin/reason/${employee._id}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setReason(res.data.rejectReason || "");
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  useEffect(() => {
    handleReason();
  }, [employee._id]);

  // ✅ Approve Function
  const handleToggleApproval = async () => {
    try {
      setIsProcessing(true);
      const res = await axios.put(
        `${apiurl}superadmin/employees/toggle/${employee._id}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Employee approved successfully.");
        setUpdateStatus("approved");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to approve employee.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Reject Function
  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }

    try {
      setIsProcessing(true);
      const res = await axios.put(
        `${apiurl}api/reject/reject/${employee._id}`,
        { reason: rejectReason },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Employee request rejected successfully.");
        setShowRejectModal(false);
        setRejectReason("");
        setUpdateStatus("rejected");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reject employee.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Document renderer
  const renderDocument = (filePath) => {
    if (!filePath) return <span className="text-gray-500">Not available</span>;
    if (Array.isArray(filePath))
      return filePath.map((path, idx) => (
        <a
          key={idx}
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-600 hover:underline"
        >
          {path.split("/").pop()}
        </a>
      ));
    if (typeof filePath === "string")
      return (
        <a
          href={filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {filePath.split("/").pop()}
        </a>
      );
    return <span className="text-gray-500">Not available</span>;
  };

  return (
    <SuperLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white shadow-lg rounded-2xl max-w-5xl w-full p-10">
          <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-10">
            Employee Profile
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Employee ID", value: employee.employeeId },
              { label: "Name", value: employee.name },
              { label: "Department", value: employee.department },
              { label: "Position", value: employee.position },
              { label: "Date of Joining", value: employee.dateOfJoining },
              { label: "Email", value: employee.email },
              { label: "Mobile No", value: employee.mobileNo },
              {
                label: "Education Certificate",
                value: renderDocument(employee.educationCertificate),
              },
              {
                label: "Local Address Proof",
                value: renderDocument(employee.localAddressProof),
              },
              {
                label: "Permanent Address Proof",
                value: renderDocument(employee.addressProof),    //Permanent Address->>addressProof
              },
              {
                label: "Other Documents",
                value: renderDocument(employee.OtherDocuments),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gradient-to-b from-blue-200 rounded-lg p-5 shadow-sm flex flex-col"
              >
                <span className="text-gray-600 font-medium mb-1">
                  {item.label}:
                </span>
                <div className="text-gray-800 break-words">{item.value}</div>
              </div>
            ))}

            <div className="bg-gradient-to-b from-blue-200 rounded-lg p-5 shadow-sm flex flex-col col-span-2">
              <span className="text-gray-600 font-medium mb-1">Reason:</span>
              <div className="text-gray-800 break-words">
                {reason ? reason : "No rejection reason available"}
              </div>
            </div>
          </div>

          {/* ✅ Approve & Reject Buttons */}
         { updateStatus=="none" && <div className="flex flex-col md:flex-row gap-6 mt-10">
            <button
              onClick={handleToggleApproval}
              disabled={isProcessing || updateStatus === "approved"}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition ${
                updateStatus === "approved"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              <CheckCircle size={24} /> Approve
            </button>

            <button
              onClick={() => setShowRejectModal(true)}
              disabled={isProcessing || updateStatus === "rejected"}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition ${
                updateStatus === "rejected"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              <XCircle size={24} /> Reject
            </button>
          </div>}

          <button
            onClick={() => navigate("/superemplist")}
            className="mt-8 w-full text-center text-blue-600 font-medium hover:underline"
          >
            ← Back to Employee List
          </button>
        </div>

        {/* ✅ Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-xl">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Enter Rejection Reason
              </h3>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full border border-gray-300 rounded-md p-2 h-28 resize-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowRejectModal(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectSubmit}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  {isProcessing ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperLayout>
  );
};

export default SuperView;
