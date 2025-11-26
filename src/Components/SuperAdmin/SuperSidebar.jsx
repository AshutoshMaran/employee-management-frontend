import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdPeopleAlt} from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { VscProject } from "react-icons/vsc";
import { BsCalendarEvent } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md"; 
import Nixies from '../../assets/Nixies.png'
import { apiurl } from "../../appUrl";
import axios from "axios";

const SuperSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (url) => location.pathname.startsWith(url);

  const menuItems = [
    { name: "Dashboard", url: "/superdashboard", icon: <MdDashboard size={20} /> },
    { name: "Employees", url: "/superemplist", icon: <MdPeopleAlt size={20} /> },
    // { name: 'Leave', url: '/superleave', icon: <SlCalender size={20} /> },
   { name: 'Project', url: '/superproject', icon: <VscProject size={20} /> },
// { name: 'Assignment', url: '/assignment', icon: <GrDocumentPerformance size={20} /> },
   { name: 'AllReruest', url: '/SuperAllrequest', icon: <BsCalendarEvent size={20} /> },
   { name: "Admin", url: "/addadmin", icon: <MdAdminPanelSettings size={20} /> }

   
  ];

  const handleLogout = async() => {
   const res=await axios.post(`${apiurl}logout/superAdmin`,{},{withCredentials:true});
   if(res.status===200){
navigate("/super-admin-login");
   }
   else{
    alert('unable to logout!!');
   }
    
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-100  text-gray-800 shadow-2xl flex flex-col rounded-r-3xl">
   
      <div className="flex items-center justify-center py-6 px-4 border-b border-blue-200">
              <img src={Nixies} alt="Nixies Logo" className="h-14 w-auto object-contain" />
            </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.url}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive(item.url)
                    ? "bg-white text-purple-900 font-semibold shadow-md"
                    : "text-purple-800 hover:bg-purple-300 hover:text-purple-900"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    
      <div className="p-4 border-t border-purple-300">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium transition hover:bg-purple-700 shadow-md"
        >
          <IoLogOutOutline size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SuperSidebar;
