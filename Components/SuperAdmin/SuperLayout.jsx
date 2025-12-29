import React, { useState } from "react";
import SuperSidebar from "./SuperSidebar";
import SuperNavbar from "./SuperNavbar";
import { Outlet } from "react-router-dom";

const SuperLayout = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const dummyUser = { email: "superadmin@example.com" };
  const dummyNotifications = ["New leave request received"];

  return (
    <div className="flex h-screen overflow-hidden">
     
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <SuperSidebar />
      </div>

  
      <div className="flex flex-col flex-1">
        <SuperNavbar
          toggleSidebar={toggleSidebar}
          user={dummyUser}
          notifications={dummyNotifications}
        />
        <main className="p-6 bg-gray-50 min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperLayout;
