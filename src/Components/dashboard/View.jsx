import React from 'react';
import axios from 'axios';
import {
  FaIdBadge,
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaFilePdf,
  FaFileArchive,
} from 'react-icons/fa';
import { CheckCircle, XCircle } from 'lucide-react';
import { apiurl } from '../../appUrl';

const View = ({ employee, onClose, isSuperAdmin }) => {
  if (!employee) return null;

  const token = localStorage.getItem('user'); 
  const baseurl = apiurl.slice(0, apiurl.lastIndexOf('/auth'));

  const handleToggleApproval = async () => {
    try {
      const res = await axios.put(
        `${baseurl}/superadmin/employees/toggle/${employee.employeeId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        alert('Employee status toggled successfully.');
        window.location.reload(); 
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to update status.');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white/40 backdrop-blur-md flex justify-center items-center z-50 px-4"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <div className="bg-gradient-to-tr from-white to-blue-50 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-12 transform transition duration-500 ease-in-out scale-100 opacity-100 animate-fadeInScale relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-800 hover:text-red-500 text-2xl font-bold focus:outline-none transition transform hover:scale-110"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12 tracking-wider drop-shadow-sm">
          Employee Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Detail icon={<FaIdBadge />} label="Employee ID" value={employee.employeeId} />
          <Detail icon={<FaUser />} label="Name" value={employee.name} />
          <Detail icon={<FaCalendarAlt />} label="Date of Joining" value={formatDate(employee.dateOfJoining)} />
          <Detail icon={<FaEnvelope />} label="Email" value={employee.email} />
          <Detail icon={<FaPhone />} label="Mobile" value={employee.mobileNo} />
        </div>

        <hr className="my-12 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Detail icon={<FaBriefcase />} label="Department" value={capitalize(employee.department)} />
          <Detail icon={<FaBriefcase />} label="Role" value={capitalize(employee.position)} />
          <Detail icon={<FaGraduationCap />} label="Education" value={formatEducation(employee.education)} />
          <Detail icon={<FaMapMarkerAlt />} label="Address" value={employee.address} />
        </div>

        <hr className="my-12 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FileDetail icon={<FaFilePdf />} label="Education Certificate" file={employee.educationCertificate} />
          <FileDetail icon={<FaFilePdf />} label="Address Proof" file={employee.addressProof} />
          <FileDetail icon={<FaFileArchive />} label="Other Documents" file={employee.OtherDocuments} multiple />
        </div>

        {/* {isSuperAdmin && (
          <div className="flex gap-4 justify-center mt-12">
            <button
              onClick={handleToggleApproval}
              className="flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-700 transition"
            >
              <CheckCircle size={20} /> Toggle Approval
            </button>
            <button
              onClick={() => alert('Reject functionality not implemented yet')}
              className="flex items-center gap-2 bg-red-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-red-700 transition"
            >
              <XCircle size={20} /> Reject
            </button>
          </div>
        )} */}

        <div className="mt-14 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-12 py-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Close
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fadeInScale { animation: fadeInScale 0.4s ease forwards; }
        `}
      </style>
    </div>
  );
};

const Detail = ({ icon, label, value }) => (
  <div className="flex items-center space-x-5 p-5 rounded-2xl border bg-white">
    <div className="text-blue-600 text-3xl">{icon}</div>
    <div>
      <p className="text-blue-900 font-semibold">{label}</p>
      <p className="text-gray-700 mt-1">{value || 'N/A'}</p>
    </div>
  </div>
);

const FileDetail = ({ icon, label, file, multiple }) => {
  let files = [];
  if (multiple && Array.isArray(file)) {
    files = file;
  } else if (file) {
    files = [file]; 
  }

  const baseurl = apiurl.slice(0, apiurl.lastIndexOf('/auth'));

  return (
    <div className="flex flex-col md:flex-row md:items-start space-y-2 md:space-y-0 md:space-x-4 p-5 rounded-2xl border bg-white">
      <div className="flex items-center space-x-3 mb-2 md:mb-0">
        <div className="text-blue-600 text-3xl">{icon}</div>
        <p className="text-blue-900 font-semibold">{label}</p>
      </div>
      <div className="flex flex-col justify-start mt-1 space-y-1">
        {files.length > 0 ? (
          files.map((f, idx) => {
            const fileName = f?.name || (typeof f === 'string' ? f.split('/').pop() : 'File');
            const fileUrl = f?.url ? f.url : `${baseurl}/uploads/tasks/${fileName}`;
            return (
              <a
                key={idx}
                href={fileUrl}
                download={fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {fileName}
              </a>
            );
          })
        ) : (
          <span className="text-gray-700">N/A</span>
        )}
      </div>
    </div>
  );
};


function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : 'N/A';
}

function formatEducation(edu) {
  switch (edu) {
    case 'highschool':
      return 'High School';
    case 'bachelor':
      return "Bachelor's";
    case 'master':
      return "Master's";
    default:
      return edu || 'N/A';
  }
}

export default View;
