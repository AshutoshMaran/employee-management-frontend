import React, { useState, useEffect } from "react";
import { apiurl } from "../../appUrl";


const EmployeeProjectHistory = ({ employeeName, onClose }) => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiurl}auth/employee/projects?name=${encodeURIComponent(employeeName)}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} error`);
        return res.json();
      })
      .then((data) => setHistory(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [employeeName]);

  const content = () => {
    if (loading)
      return (
        <div className="p-6 text-blue-600 text-center text-lg font-semibold">
          Loading…
        </div>
      );
    if (error)
      return (
        <div className="p-6 text-red-600 text-center font-medium">
          Error: {error}
        </div>
      );
    if (!history || !history.projects?.length)
      return (
        <div className="p-6 text-gray-600 text-center italic">
          No projects found for <span className="font-semibold">{employeeName}</span>.
        </div>
      );

    return history.projects.map((proj, idx) => (
      <div
        key={idx}
        className="mb-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-md p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <h4 className="text-xl font-semibold text-blue-700 mb-1 flex items-center gap-2">
          {proj.projectName}{" "}
          {!proj.endDate && (
            <span className="text-sm bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-medium">
              Current
            </span>
          )}
        </h4>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Role:</span> {proj.role || "-"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Duration:</span> {proj.startDate} &rarr;{" "}
          {proj.endDate || "Present"}
        </p>
      </div>
    ));
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-8 scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h3
          id="modal-title"
          className="text-3xl font-extrabold text-blue-900 mb-6 text-center"
        >
          {employeeName} — Project History
        </h3>
        <div id="modal-description">{content()}</div>
      </div>
    </div>
  );
};

export default EmployeeProjectHistory;
