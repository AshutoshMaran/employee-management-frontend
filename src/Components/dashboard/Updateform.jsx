// Updateform.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiurl } from '../../appUrl';

const Updateform = ({ onClose }) => {
  const { empId } = useParams();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState({
    name: '',
    position: '',
    department: '',
    dateofjoining: '',
    email: '',
    mobileNo: '',
    education: '',
    address: '',
  });

  const [suggestions, setSuggestions] = useState({
    name: '',
    position: '',
    department: '',
    dateofjoining: '',
    email: '',
    mobileNo: '',
    education: '',
    address: '',
    remark: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (empId) fetchEmployee();
  }, [empId]);

  const fetchEmployee = async () => {
    try {
      // const token = localStorage.getItem('adminToken');
      // if (!token) return alert("No admin token found");

      const res = await fetch(`${apiurl}auth/getEmployeeById/${empId}`, {
        // headers: { Authorization: `Bearer ${token}` }
        credentials:"include",
      });

      const json = await res.json();
      if (res.ok) {
        setOriginalData({
          name: json.name || json.firstName + " " + json.lastName || '',
          position: json.position || '',
          department: json.department || '',
          dateofjoining: json.dateOfJoining || '',
          email: json.email || '',
          mobileNo: json.mobileNo || '',
          education: json.education || '',
          address: json.address || '',
        });
      } else {
        alert("Failed to load employee data");
      }
    } catch (err) {
      console.error("Error fetching employee data:", err);
      alert("Error loading employee data");
    }
  };

  const handleSuggestionChange = (e) => {
    const { name, value } = e.target;
    setSuggestions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // const token = localStorage.getItem('adminToken');
      // if (!token) return alert("No admin token");
    //  console.log("Token",adminToken);
     
      const changed = {};
      Object.keys(suggestions).forEach(key => {
        if (key === 'remark') return;
        const suggested = suggestions[key];
        const orig = originalData[key];
        if (suggested && suggested !== orig) {
          changed[key] = suggested;
        }
      });
     

      if (Object.keys(changed).length === 0 && !suggestions.remark) {
        alert("No changes suggested");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        suggestions: changed,
        remark: suggestions.remark || ''
      };

      const response = await axios.put(
        `${apiurl}auth/submit-employee-update/${empId}`,
        payload,
        // {
        //   // headers: {
        //   //   Authorization: `Bearer ${token}`
        //   // }
        // }
       { withCredentials: true },
      );

      if (response.data.success) {
        alert(" Update request submitted");
        // onSubmit(res.data.updatedEmployee);
        // LoadEmployees();
        navigate("/employees");
      } else {
        alert( (response.data.message || "Failed to submit update request"));
      }
    } catch (err) {
      console.error("Error submitting update:", err);
      alert(" Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl p-10 overflow-y-auto max-h-[90vh] border border-gray-200">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Suggest Employee Update</h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'Full Name', name: 'name', type: 'text' },
            { label: 'Position', name: 'position', type: 'text' },
            { label: 'Department', name: 'department', type: 'text' },
            { label: 'Date of Joining', name: 'dateofjoining', type: 'date' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Mobile Number', name: 'mobileNo', type: 'tel' },
            { label: 'Education', name: 'education', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={originalData[name] || ''}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 mb-2"
              />
              <input
                type={type}
                name={name}
                value={suggestions[name] || ''}
                onChange={handleSuggestionChange}
                placeholder={`Suggest new ${label.toLowerCase()}`}
                className="w-full p-3 rounded-lg border border-blue-400 focus:ring focus:ring-blue-200 bg-white"
                disabled={isSubmitting}
              />
              {suggestions[name] && suggestions[name] !== originalData[name] && (
                <p className="text-sm text-yellow-600 mt-1 italic">
                  Would like to change <strong>{label}</strong> from <strong>{originalData[name]}</strong> to <strong>{suggestions[name]}</strong>
                </p>
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <textarea
            name="address"
            rows="3"
            value={originalData.address || ''}
            readOnly
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 mb-2"
          />
          <textarea
            name="address"
            rows="2"
            value={suggestions.address || ''}
            onChange={handleSuggestionChange}
            placeholder="Suggest new address"
            className="w-full p-3 rounded-lg border border-blue-400 focus:ring focus:ring-blue-200 bg-white"
            disabled={isSubmitting}
          />
          {suggestions.address && suggestions.address !== originalData.address && (
            <p className="text-sm text-yellow-600 mt-1 italic">
              Would like to change address from <strong>{originalData.address}</strong> to <strong>{suggestions.address}</strong>
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Remark (optional)</label>
          <textarea
            name="remark"
            rows="2"
            value={suggestions.remark}
            onChange={handleSuggestionChange}
            placeholder="Add any additional remarks"
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-100 bg-white"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
              else navigate("/employees");
            }}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Updateform;
