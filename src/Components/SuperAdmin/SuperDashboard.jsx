import React, { useState } from 'react';
// import Card from '../dashboard/Card';
import SuperPiechart from './SuperPiechart';
import SuperSidebar from './SuperSidebar';
import SuperNavbar from './SuperNavbar';
import SuperEmpOverview from './SuperEmpOverview';


const SuperDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const dummyUser = { email: 'superadmin@example.com' };
  const dummyNotifications = ['Welcome to Dashboard!', '2 New leave requests'];

  return (
    <div className="flex h-screen overflow-hidden">
  
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <SuperSidebar />
      </div>

   
      <div className="flex flex-col flex-1 min-h-screen bg-gray-50">
   
        <SuperNavbar
          toggleSidebar={toggleSidebar}
          user={dummyUser}
          notifications={dummyNotifications}
        />
        <main className="p-1 space-y-26 overflow-auto">
          {/* <Card /> */}
          <div className="flex-col md:flex-row gap-6">
            <div className="flex-1">
              <SuperEmpOverview />
            </div>
            <div className="w-full md:w-1/3">
              <SuperPiechart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperDashboard;
