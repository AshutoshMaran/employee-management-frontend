
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
const dummyUser = { name: 'Mini Shrivastava' };
  const dummyNotifications = ['Welcome!', 'Reminder: Submit report'];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (  
    <div className="flex h-screen overflow-hidden">
  
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-0'} overflow-hidden`}>
        <Sidebar />
      </div>

 
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} 
        user={dummyUser}
        notifications={dummyNotifications}/>
        <main className="flex-1 overflow-auto bg-gray-50 p-4"><Outlet/></main>
      </div>
    </div>
    
  );
};

export default Layout;


    