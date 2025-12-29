import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import EmployeeNavbar from './Emp_Navbar';

const LeaveApplicationForm = ({ onClose, userId }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    duration: 1,
    resumptionDate: '',
    reason: '',
  });

  const empToken = localStorage.getItem('userToken');
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const notifications = [];

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      duration: 1,
      resumptionDate: '',
      reason: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) throw new Error('Token not found. Please log in.');

      const decoded = jwtDecode(token);
      const empId = decoded.emp_id;

      const payload = {
        userId,
        ...formData,
        duration: Number(formData.duration),
      };

      const response = await fetch(`http://192.168.1.25:5000/leave/employee/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${empToken}`,
        },
        body: JSON.stringify(payload),
      });

      await response.json();
      alert(' Leave application submitted successfully!');
      onClose();
    } catch (error) {
      alert(` Submission failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 overflow-auto">
      <EmployeeNavbar user={user} notifications={notifications} />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800"> Leave Application</h2>
          {/* <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-2xl font-bold"
            disabled={loading}
          >
            &times;
          </button> */}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-lg">
        
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Leave Type</label>
            <input
              type="text"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Sick Leave"
              required
              disabled={loading}
            />
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

    
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Resumption Date</label>
            <input
              type="date"
              name="resumptionDate"
              value={formData.resumptionDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

        
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              placeholder="Enter reason for leave..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

       
          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 text-red-600 border border-red-500 rounded-lg hover:bg-red-100 transition-all"
              disabled={loading}
            >
              Reset
            </button>

            <button
              type="submit"
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
