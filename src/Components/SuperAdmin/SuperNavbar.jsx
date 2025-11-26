import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../../appUrl";

const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "U";

const SuperNavbar = ({ toggleSidebar, user }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const [errorNotif, setErrorNotif] = useState(null);
  const [hasNewNotif, setHasNewNotif] = useState(false); 

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
   
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
  console.log("hello 123456"); 
  try {
    setLoadingNotif(true);
    
    console.log('hello next');
    const res = await axios.get(apiurl + "api/notifications/getNotificationsBySuperAdmin");
    console.log('hello 789');

    if (res.status === 200) {
      const notifList = res.data.notifications || [];
      setNotifications(notifList);

      const unread = notifList.some((n) => !n.isRead);
      setHasNewNotif(unread);
    } else {
      throw new Error("Failed to fetch notifications");
    }
  } catch (error) {
    console.error("Notification fetch error:", error);
    setErrorNotif("Could not load notifications");
  } finally {
    setLoadingNotif(false);
  }
};
 

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

  const handleNotificationClick = async (note) => {
  try {
  
    await axios.put(`${apiurl}api/notifications/${note._id}/read`);

  
    setShowNotif(false);

   
    if (note.routeTo) {
      navigate(note.routeTo);
    }

  
    fetchNotifications();
  } catch (err) {
    console.error("Error handling notification click:", err);
  }
};


  return (
    <nav className="w-full bg-gradient-to-b from-blue-200 shadow-xl border-b border-gray-200 px-4 py-3 flex justify-between items-center z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 text-2xl hover:text-blue-600 transition"
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>
      </div>

      <div className="flex items-center gap-6 relative">
       
        <div className="relative" ref={notifRef}>
          <button
            className="text-gray-600 text-xl hover:text-blue-600 transition relative"
            aria-label="Notifications"
            onClick={() => {
              setShowNotif((prev) => !prev);
              setShowUserMenu(false);
              setHasNewNotif(false); 
            }}
          >
            <FiBell className={hasNewNotif ? "animate-bounce" : ""} />
            {hasNewNotif && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-3 text-sm font-semibold border-b">Notifications</div>
              <ul className="max-h-60 overflow-y-auto">
                {loadingNotif ? (
                  <li className="p-3 text-sm text-gray-500">Loading...</li>
                ) : errorNotif ? (
                  <li className="p-3 text-sm text-red-500">{errorNotif}</li>
                ) : notifications.length > 0 ? (
                  notifications.map((note, index) => (
                    <li
                      key={note._id ?? index}
                      onClick={() => handleNotificationClick(note)}
                      className="p-3 hover:bg-gray-100 text-sm text-gray-700 border-b last:border-none cursor-pointer"
                    >
                      <div className="text-xs text-blue-600">{note.notificationType}</div>
                      <div>{note.message || `Notification ${index + 1}`}</div>
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
            onClick={() => {
              setShowUserMenu((prev) => !prev);
              setShowNotif(false);
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-blue-500">
              {getInitial("SuperAdmin")}
            </div>
            <span className="text-sm font-medium">{"SuperAdmin"}</span>
          </button>

          {/* {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )} */}


          {showUserMenu && (
  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
    <ul className="text-sm text-gray-700">
      {/* <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setShowUserMenu(false); 
          navigate("/superprofile"); 
        }}
      >
        Profile
      </li> */}
      {/* <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
         
          localStorage.clear();
          navigate("/super-admin-login"); 
        }}
      >
        Logout
      </li> */}
    </ul>
  </div>
)}

        </div>
      </div>
    </nav>
  );
};

export default SuperNavbar;
