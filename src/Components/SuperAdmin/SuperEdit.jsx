import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuperLayout from './SuperLayout';
import { apiurl } from '../../appUrl';
const SuperEdit = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [empId, setEmpId] = useState('');

  useEffect(() => {
    fetchUpdateRequest();
  }, [notificationId]);

  const fetchUpdateRequest = async () => {
    try {
      const token = localStorage.getItem('user');
      const res = await axios.get(`${apiurl}notify/${notificationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        const data = res.data.notification;
        const emp = data.employeeId;

       
        const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();

        const modifiedOriginal = {
          ...emp,
          fullName, 
        };

        const modifiedSuggestions = {
          ...data.pendingUpdates,
        };

        
        if (modifiedSuggestions.firstName || modifiedSuggestions.lastName) {
          modifiedSuggestions.fullName = `${modifiedSuggestions.firstName || emp.firstName || ''} ${modifiedSuggestions.lastName || emp.lastName || ''}`.trim();
        }

        setEmpId(emp._id);
        setOriginalData(modifiedOriginal);
        setSuggestions(modifiedSuggestions);
        setRemark(data.remark || '');
      } else {
        alert('Failed to fetch update request');
      }
    } catch (err) {
      console.error(err);
      alert('Error loading update request');
    } finally {
      setLoading(false);
    }
  };

 const handleDecision = async (decision) => {
  const confirm = window.confirm(`Are you sure you want to ${decision} this request?`);
  if (!confirm) return;

  setIsProcessing(true);
  try {
    const token = localStorage.getItem('user');

   

    if (!token) {
      alert('No token found. Please log in again.');
      navigate('/superemplist');
      return;
    }

    const endpoint = decision === 'approve'
      ? `${apiurl}auth/approve-employee-update/${empId}`
      : `${apiurl}reject-update/${empId}`;

    const res = await axios.put(endpoint, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.data.success) {
      alert(`Request ${decision}d successfully`);
      navigate('/superemplist');
    } else {
      alert(res.data.message || `Failed to ${decision} request`);
    }
  } catch (err) {
    console.error('Backend error:', err.response?.data || err.message);
    alert(`Error while trying to ${decision} request`);
  } finally {
    setIsProcessing(false);
  }
};


  if (loading) {
    return (
      <SuperLayout>
        <p className="text-center py-10 text-gray-600">Loading...</p>
      </SuperLayout>
    );
  }


  const fieldsToDisplay = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    { key: 'dateOfJoining', label: 'Date of Joining' },
    { key: 'email', label: 'Email' },
    { key: 'mobileNo', label: 'Mobile Number' },
    { key: 'education', label: 'Education' },
    { key: 'address', label: 'Address' },
  ];

  return (
    <SuperLayout>
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl p-10 mx-auto overflow-y-auto max-h-[90vh] border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Review Update Request</h2>

        <div className="space-y-8">
          {fieldsToDisplay.map(({ key, label }) => {
            const original = originalData[key] || '';
            const suggested = suggestions[key];
         

            const isLongField = key === 'address' || key === 'education';

            return (
              <div key={key}>
                <label className="block text-gray-700 font-medium mb-1">{label}</label>

                {isLongField ? (
                  <>
                    <textarea
                      value={original}
                      readOnly
                      rows={3}
                      className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 mb-2"
                    />
                 
                </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={original}
                      readOnly
                      className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 mb-2"
                    />
                    
                  </>
                )}

                <p className="text-sm text-yellow-600 mt-1 italic">
                  Suggested to change from <strong>{original}</strong> to <strong>{suggested}</strong>
                </p>
              </div>
            );
          })}
        </div>

        {remark && (
          <div className="mt-10">
            <label className="block text-gray-700 font-medium mb-1">Remark from Requester</label>
            <textarea
              value={remark}
              readOnly
              rows={2}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800"
            />
          </div>
        )}

        <div className="flex justify-end gap-4 pt-10">
          <button
            type="button"
            onClick={() => handleDecision('reject')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Reject'}
          </button>
          <button
            type="button"
            onClick={() => handleDecision('approve')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Approve'}
          </button>
        </div>
      </div>
    </SuperLayout>
  );
};

export default SuperEdit;
