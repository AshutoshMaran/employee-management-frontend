


import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiMenu, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiurl } from '../../appUrl';
import { jwtDecode } from 'jwt-decode';

const EmployeeNavbar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotif, setHasNewNotif] = useState(false); 
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const notifRef = useRef(null);
  const menuRef = useRef(null);

  // const userid=localStorage.getItem('userId');
  // const token=localStorage.getItem('userToken');
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || 'U';

 
 useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // const token = localStorage.getItem('userToken');
        // if (!token) throw new Error('Token not found. Please log in.');

        const profileRes = await axios.get(
          `${apiurl}profile/profileUser`,
       {withCredentials:true},
        );
       console.log(profileRes);
       
        const profileData = profileRes?.data?.employeeDetails;
        setUser(profileData);

      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotif(false);
      if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleNotificationClick = async (note) => {
    try {
      if (!note.isRead) {
        await axios.put(`${apiurl}api/notifications/${note._id}/read`); 
      }
      setShowNotif(false);
      if (note.routeTo) navigate(note.routeTo); 
      fetchNotifications(); 
    } catch (err) {
      console.error('Error handling notification click:', err);
    }
  };

  const handleLogout = async() => {
    

    const res=await axios.post(`${apiurl}logout/employee`,{},{withCredentials:true});

    if(res.status===200)
    {
      navigate('/login');
    }
    else{
      alert('unable to logout')
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-white via-blue-50 to-white shadow-md border-b border-gray-200 px-4 py-3 z-50 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-gray-600 hover:text-blue-600 transition text-xl" title="Go Back">
            <FiArrowLeft />
          </button>
          <div className="text-2xl font-extrabold text-blue-700 tracking-wide">Employee Portal</div>
        </div>

       
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium text-sm">
          <li onClick={() => navigate('/employee-dashboard')} className="hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li onClick={() => navigate('/eprojects')} className="hover:text-blue-600 cursor-pointer">Project</li>
          <li onClick={() => navigate('/eTask')} className="hover:text-blue-600 cursor-pointer">Tasks</li>
          {/* <li onClick={() => navigate('/emp_event')} className="hover:text-blue-600 cursor-pointer">Event</li> */}
          {/* <li onClick={() => navigate('/leave-application')} className="hover:text-blue-500 cursor-pointer">Leave Form</li> */}
          <li onClick={() => navigate('/eall-request')} className="hover:text-blue-600 cursor-pointer">All Request</li>
        </ul>

       
        <div className="flex items-center gap-5">
         
          <div className="relative" ref={notifRef}>
            <button className="text-gray-600 text-xl hover:text-blue-600 transition relative" onClick={() => { setShowNotif(!showNotif); setHasNewNotif(false); }}>
              <FiBell className={hasNewNotif ? 'animate-bounce' : ''} />
              {hasNewNotif && <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-xl z-50">
                <div className="p-3 font-semibold border-b text-blue-700">Notifications</div>
                <ul className="divide-y divide-gray-100">
                  {notifications.length > 0 ? notifications.map((note, idx) => (
                    <li key={note._id ?? idx} onClick={() => handleNotificationClick(note)} className="p-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition">
                      <div className="text-xs text-blue-600">{note.notificationType}</div>
                      <div>{note.message}</div>
                    </li>
                  )) : <li className="p-3 text-sm text-gray-500">No notifications</li>}
                </ul>
              </div>
            )}
          </div>

         
          <div className="relative" ref={menuRef}>
            <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">{getInitial(user?.firstName)}</div>
              <span className="text-sm font-semibold hidden md:inline">{user?.firstName}</span>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/profile'); setShowMenu(false); }}>My Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500" onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>

         
          <button className="md:hidden text-2xl text-gray-600 hover:text-blue-600 transition" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <FiMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
