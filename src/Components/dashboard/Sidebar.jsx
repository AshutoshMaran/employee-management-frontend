import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nixies from '../../assets/Nixies.png';
import { MdDashboard, MdPeopleAlt } from "react-icons/md";
// import { GrTask, GrDocumentPerformance } from "react-icons/gr";
// import { SlCalender } from "react-icons/sl";
import { IoLogOutOutline } from "react-icons/io5";
import { VscProject } from "react-icons/vsc";
// import { FaRankingStar } from "react-icons/fa6";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsCalendarEvent } from "react-icons/bs";
import axios from 'axios';
import { apiurl } from "../../appUrl";
import Swal from 'sweetalert2'

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  const toggleRankingDropdown = () => {
    setIsRankingOpen(prev => !prev);
  };

  const isActive = (url) => location.pathname.startsWith(url);

  useEffect(() => {
    if (location.pathname.startsWith('/ranking')) {
      setIsRankingOpen(true);
    }
  }, [location.pathname]);

  const menuItems = [
    { name: 'Dashboard', url: '/dashboard', icon: <MdDashboard size={20} /> },
    { name: 'Employees', url: '/employees', icon: <MdPeopleAlt size={20} /> },
    // { name: 'Tasks', url: '/tasks', icon: <GrTask size={20} /> },
    // { name: 'Leave', url: '/leave', icon: <SlCalender size={20} /> },
    { name: 'Projects', url: '/project', icon: <VscProject size={20} /> },
    // { name: 'Assignment', url: '/assignment', icon: <GrDocumentPerformance size={20} /> },
     { name: 'Requests', url: 'requests', icon: <BsCalendarEvent size={20} /> }
  ];

  const handleLogout = async() => {
    
     const res=await axios.post(`${apiurl}logout/admin`,{},{withCredentials:true});

    if(res.status===200)
    {
    navigate('/Admin');
    }
    else{
      alert('unable to logout');
    }


  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-100  text-gray-800 shadow-2xl flex flex-col rounded-r-3xl">
      <div className="flex items-center justify-center py-6 px-4 border-b border-gray-200">
        <img src={Nixies} alt="Nixies Logo" className="h-14 w-auto object-contain" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className={`rounded-md transition duration-300 ${
                isActive(item.url) ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              <Link to={item.url} className="flex items-center gap-3 px-4 py-3 text-black">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          
       
        
        
      
         
          <li
            className={`rounded-md transition duration-300 cursor-pointer ${
              isRankingOpen || isActive('/ranking') ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
            }`}
            onClick={toggleRankingDropdown}
          >
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isRankingOpen ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <ul className="ml-7 mt-1 mb-3 rounded-md bg-gray-100 py-2 px-2 space-y-1 text-sm">
                <li>
                  <Link
                    to="/ranking"
                    className={`block px-3 py-2 rounded-md text-black hover:bg-white transition ${
                      location.pathname === '/ranking' ? 'bg-white font-medium' : ''
                    }`}
                  >
                    Main Ranking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ranking/monthly-yearly"
                    className={`block px-3 py-2 rounded-md text-black hover:bg-white transition ${
                      location.pathname === '/ranking/monthly-yearly' ? 'bg-white font-medium' : ''
                    }`}
                  >
                    Monthly / Yearly
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
      onClick={()=>Swal.fire({
       title: "Are you sure?",
       text: "Do you want to log out?",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, Logout"
     }).then((result) => {
       if (result.isConfirmed) {
         handleLogout();
         Swal.fire({
           title: "Logged out !",
           text:"You have been logged out successfully.",
           icon: "success",
              timer: 1500,
             showConfirmButton: false
         });
       }
     })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left text-black transition hover:bg-red-50 hover:text-red-600"
        >
          <IoLogOutOutline size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
