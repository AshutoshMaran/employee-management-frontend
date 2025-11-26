import React, { useState } from "react";
import { apiurl } from "../../appUrl";

// Reusable modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // <div className="fixed  inset-0 bg-transparent  bg-opacity-50 flex justify-center items-center z-50">
    //   <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden relative">
      <div className="fixed inset-0 backdrop-transparent-sm bg-opacity-40 flex justify-center items-center z-50">
  <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative">

    <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-10"
        >
          &times;
        </button>
        <div className="p-6 overflow-y-auto max-h-[85vh]">{children}</div>
      </div>
    </div>
  );
};

function AssignProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sendEmail, setSendEmail] = useState(true); 

  const [employeesList] = useState([
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { employeeId: "", name: "", email: "", role: "" },
  ]);

  const handleMemberChange = (i, field, value) => {
    const updated = [...teamMembers];
    if (field === "name") {
      const emp = employeesList.find((e) => e.name === value) || {};
      updated[i] = { ...updated[i], name: emp.name || "", email: emp.email || "" };
    } else {
      updated[i][field] = value;
    }
    setTeamMembers(updated);
  };

  const addMember = () => {
    setTeamMembers([
      ...teamMembers,
      { employeeId: "", name: "", email: "", role: "" },
    ]);
  };

  const removeMember = (i) => {
    const updated = [...teamMembers];
    updated.splice(i, 1);
    setTeamMembers(updated);
  };

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setSendEmail(true);
    setTeamMembers([{ employeeId: "", name: "", email: "", role: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      projectName,
      description,
      startDate,
      endDate,
      teamMembers,
      sendEmailNotification: sendEmail,
    };

    try {
      const response = await fetch(`${apiurl}auth/assign-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to assign project");
      }

      alert("✅ Project created successfully!");
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Error creating project. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">📝 Project Assign</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Assign New Project
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

         
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-800">Team Members</h3>
            {teamMembers.map((member, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="block text-sm text-gray-600">Employee ID</label>
                  <input
                    value={member.employeeId}
                    onChange={(e) => handleMemberChange(i, "employeeId", e.target.value)}
                    className="w-full border rounded-md px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Name</label>
                  <select
                    value={member.name}
                    onChange={(e) => handleMemberChange(i, "name", e.target.value)}
                    className="w-full border rounded-md px-2 py-1"
                  >
                    <option value="">Select Name</option>
                    {employeesList.map((e, idx) => (
                      <option key={idx} value={e.name}>{e.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                    value={member.email}
                    readOnly
                    className="w-full border rounded-md px-2 py-1 bg-gray-100"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => removeMember(i)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMember}
              className="text-blue-600 hover:underline"
            >
              + Add Another Member
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sendEmail"
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="sendEmail" className="text-sm text-red-600">
              Send email notification
            </label>
          </div>

          <button
            type="submit"
            className="block w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AssignProject;
