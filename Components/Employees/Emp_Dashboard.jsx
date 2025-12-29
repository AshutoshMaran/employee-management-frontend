import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LeaveApplicationForm from './LeaveApplicationForm';
import EmployeeNavbar from './Emp_Navbar';
import { FaProjectDiagram, FaCalendarCheck, FaCalendarAlt, FaUndoAlt, FaTasks } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { apiurl } from '../../appUrl';

const Emp_Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [leaves, setLeaves] = useState({});
  const [todos, setTodos] = useState([]);
  // const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const [timeFilter, setTimeFilter] = useState('today');


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        // const token = localStorage.getItem('userToken');
        // if (!token) throw new Error('Token not found. Please log in.');

        // const decoded = jwtDecode(token);
        // const empId = decoded.employeeId;
        // console.log("Decoded employee_ID:", empId);
        // localStorage.setItem('userId',empId);

        const profileRes = await axios.get(
          `${apiurl}profile/profileUser`,
         {withCredentials:true,}
        );
        console.log(profileRes.data.employeeDetails);
        
        const profileData = profileRes?.data?.employeeDetails;
        setProfile(profileData);


        // if (profileData._id) {
        //   localStorage.setItem('userId', profileData._id);
        // }
        //  console.log(profileData);


        // localStorage.setItem('userProfile', JSON.stringify(profileData));


        const [leavesRes, todosRes, assignmentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/leaves', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/todos', { headers: { Authorization: `Bearer ${token}` } }),
          // axios.get('http://localhost:5000/api/announcements', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/assignments', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setLeaves(leavesRes.data);
        setTodos(todosRes.data);
        // setAnnouncements(announcementsRes.data);
        setAssignments(assignmentsRes.data);

      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleQuickAccess = (item) => {
    switch (item) {
      case 'Apply for Leave': return navigate('/leave-application');
      // case 'Leave Recall': return navigate('/leave-recall');
      case 'Projects': return navigate('/eprojects');
      case 'Tasks': return navigate('/eTask');
      case 'Events': return navigate('/emp_event');
      default: return alert(`You clicked: ${item}`);
    }
  };

  const quickAccessButtons = [
    { label: 'Projects', icon: <FaProjectDiagram size={24} />, bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-600', hoverColor: 'hover:from-indigo-600 hover:to-purple-700', textColor: 'text-white' },
    { label: 'Tasks', icon: <FaTasks size={24} />, bgColor: 'bg-gradient-to-r from-green-400 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700', textColor: 'text-white' },
    // { label: 'Apply for Leave', icon: <FaCalendarCheck size={24} />, bgColor: 'bg-gradient-to-r from-yellow-400 to-yellow-500', hoverColor: 'hover:from-yellow-500 hover:to-yellow-600', textColor: 'text-black' },
    // { label: 'Events', icon: <FaCalendarAlt size={24} />, bgColor: 'bg-gradient-to-r from-pink-400 to-pink-600', hoverColor: 'hover:from-pink-600 hover:to-pink-700', textColor: 'text-white' },
    // { label: 'Leave Recall', icon: <FaUndoAlt size={24} />, bgColor: 'bg-gradient-to-r from-red-400 to-red-600', hoverColor: 'hover:from-red-600 hover:to-red-700', textColor: 'text-white' },
  ];

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <EmployeeNavbar
        user={{
          name: profile.fullName || 'Employee',
          email: profile.email || 'employee@example.com',
          profilePic: profile.profilePic || null,
        }}
      // notifications={announcements}
      />

      <div className="p-6">

        <div className="bg-blue-700 text-white p-6 rounded-lg flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            {profile.profilePic ? (
              <img src={profile.profilePic} alt="Profile" className="h-16 w-16 rounded-full object-cover border-2 border-yellow-400" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-yellow-400 flex items-center justify-center text-blue-700 font-bold text-xl">
                {profile.fullName ? profile.fullName.charAt(0) : 'E'}
              </div>
            )}

            {/* <div>
              <h1 className="text-2xl font-bold">Welcome, {profile.fullName || profile.name || 'employe '}</h1>
              <p className="text-sm opacity-90">{profile.role}</p>
            </div> */}

            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {profile.firstName && profile.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : profile.name || 'Employee'}
              </h1>
              <p className="text-sm opacity-90">{profile.role}</p>
            </div>

          </div>
          <button
            className="bg-yellow-400 text-black px-5 py-2 rounded-md hover:bg-yellow-300 transition duration-200"
            onClick={() => navigate('/edit')}
          >
            Edit Profile
          </button>
        </div>


        <div className="mt-6 flex flex-wrap gap-5 justify-center">
          {quickAccessButtons.map(({ label, icon, bgColor, hoverColor, textColor }) => (
            <button
              key={label}
              onClick={() => handleQuickAccess(label)}
              className={`${bgColor} ${hoverColor} ${textColor} flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl`}
              aria-label={label}
            >
              {icon}
              <span className="text-lg font-semibold">{label}</span>
            </button>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
          <DashboardCard title="Available Leave Days">
            <ul className="space-y-1 text-sm">
              {Object.entries(leaves).map(([type, count]) => (
                <li key={type}>{type}: <span className="font-semibold">{count}</span></li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard title="To‑dos">
            <ul className="list-disc list-inside text-sm space-y-1 ">
              {todos.map((task, idx) => <li key={idx}>{task}</li>)}
            </ul>
          </DashboardCard>

          {/* <DashboardCard title="Announcements">
            <ul className="list-disc list-inside text-sm space-y-1">
              {announcements.map((note, idx) => <li key={idx}>{note}</li>)}
            </ul>
          </DashboardCard> */}

          <DashboardCard title="Assignments">
            <ul className="list-disc list-inside text-sm space-y-1">
              {assignments.map((task, idx) => <li key={idx}>{task}</li>)}
            </ul>
          </DashboardCard>
        </div>


        {showLeaveForm && <LeaveApplicationForm onClose={() => setShowLeaveForm(false)} />}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, children }) => (
  <div className="bg-white p-5 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
    <h2 className="font-semibold text-lg mb-3 text-blue-800">{title}</h2>
    {children}
  </div>
);

export default Emp_Dashboard;
