
import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import axios from "axios";
import { apiurl } from "../../appUrl";
import { useNavigate } from "react-router-dom";

const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "U";

const Navbar = ({ toggleSidebar, user }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotif, setHasNewNotif] = useState(false);
  // const adminId = localStorage.getItem("adminId");

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        apiurl + "api/notifications/getNotificationsByAdmin",
        {
          withCredentials:true,
        }
      );
      if (res.data && res.data.notifications?.length > 0) {
        setNotifications(res.data.notifications);
        const unread = res.data.notifications.some((n) => !n.isRead);
        setHasNewNotif(unread);
      } else {
        setNotifications([]);
        setHasNewNotif(false);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); 
    return () => clearInterval(interval);
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target) &&
        userRef.current &&
        !userRef.current.contains(e.target)
      ) {
        setShowNotif(false);
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotif = () => {
    setShowNotif((prev) => !prev);
    setShowUserMenu(false);
    setHasNewNotif(false); 
  };

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
    setShowNotif(false);
  };


 const handleNotificationClick = async (note) => {
  try {
    
    await axios.put(`${apiurl}api/notifications/${note._id}/read`);



    
    setShowNotif(false);

    
    fetchNotifications();

   
    console.log("Navigating to:", note.routeTo);

    
    if (note.routeTo) {
      navigate(note.routeTo);
    }
  } catch (err) {
    console.error("Error updating notification:", err);
  }
};


  return (
    <nav className="w-full bg-gray-200 shadow-xl border-b border-gray-200 px-4 py-3 flex justify-between items-center z-50">
      <div className="flex items-center gap-4">
        
        {/* <button
          onClick={toggleSidebar}
          className="text-gray-600 text-2xl hover:text-blue-600 transition"
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button> */}
      </div>

      <div className="flex items-center gap-6 relative">
        
        <div className="relative" ref={notifRef}>
          <button
            className="text-gray-600 text-xl hover:text-blue-600 transition relative"
            aria-label="Notifications"
            onClick={toggleNotif}
          >
            <FiBell className={hasNewNotif ? "animate-bounce" : ""} />
            {hasNewNotif && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-3 text-sm font-semibold border-b">
                Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications?.length > 0 ? (
                  notifications.map((note, index) => (
                    <li
                      key={index}
                      onClick={() => handleNotificationClick(note)}
                      className={`p-3 cursor-pointer hover:bg-gray-100 text-sm ${
                        note.isRead ? "text-gray-500" : "text-gray-800 font-semibold"
                      }`}
                    >
                      <div className="text-xs text-blue-600">
                        {note.notificationType}
                      </div>
                      <div>{note.message}</div>
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-sm text-gray-500">No notifications</li>
                )}
              </ul>
            </div>
          )}
        </div>

      
        <div className="relative" ref={userRef}>
          <button
            onClick={toggleUserMenu}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-500">
              {getInitial(user?.email)}
            </div>
            <span className="text-sm font-medium">
              {user?.email || "User"}
            </span>
          </button>
{/* 
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
              </ul>
            </div>
          )} */}
          {showUserMenu && (
  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
    <ul className="text-sm text-gray-700">
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setShowUserMenu(false); 
          navigate("my-profile");
        }}
      >
        Profile
      </li>
    </ul>
  </div>
)}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
