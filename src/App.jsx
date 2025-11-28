import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./Components/Default";

// --- Auth ---
import Login from "./Components/login/Login";
import Signup from "./Components/login/Signup";

// --- Admin Dashboard ---
import Layout from "./Components/dashboard/Layout";
import Dashboard from "./Components/dashboard/Dashboard";
import Employees from "./Components/dashboard/Employees";
// import Tasks from "./Components/dashboard/Tasks";
import Leave_form from "./Components/dashboard/Leave_form";
import Ranking from "./Components/Ranking/Ranking";
import Monthlyearly from "./Components/Ranking/Monthlyearly";
import Leave from "./Components/dashboard/Leave";
import Updateform from "./Components/dashboard/Updateform";
import AssignProject from "./Components/Assignment/AssignProject";
import Project from "./Components/dashboard/Project";
import View from "./Components/dashboard/View";
import Task from "./Components/dashboard/Task";
import AddTask from "./Components/dashboard/AddTask";

// --- Employee Pages ---
import Emp_Dashboard from "./Components/Employees/Emp_Dashboard";
import LeaveApplicationForm from "./Components/Employees/LeaveApplicationForm";
// import task from "./Components/Employees/Tasks";
import EmpProjectTask from "./Components/Employees/Emp_projecttask";
// --- New Components ---
import EmpProjects from "./Components/Employees/Emp_project";
import Project_Feedback from "./Components/Employees/Project_Feedback";
// import LeaveRecall from "./Components/dashboard/LeaveRecall";
// import Emp_Leave from "./Components/Employees/Emp_Leave";
import Emp_Tasks from "./Components/Employees/Emp_Tasks";
// import Events from "./Components/dashboard/AllRequest";
import Emp_EventPage from "./Components/Employees/Emp_EventPage";
import EditProfile from "./Components/Employees/EditProfile";
import My_Profile from "./Components/Employees/My_Profile";
import AddEmployeeWithAccess from "./Components/dashboard/Addemployeeform";
import AdminLogin from "./Components/login/AdminLogin";
import SuperAdminLogin from "./Components/SuperAdminLogin";
import SuperDashboard from "./Components/SuperAdmin/SuperDashboard";
import SuperEmplist from "./Components/SuperAdmin/SuperEmplist";
import SuperLeave from "./Components/SuperAdmin/SuperLeave";
import SuperProject from "./Components/SuperAdmin/SuperProject";
import AddProjectForm from './Components/SuperAdmin/AddProjectForm';
import SuperEvents from "./Components/SuperAdmin/SuperAllrequest";
import SuperEmpOverview from "./Components/SuperAdmin/SuperEmpOverview";
import SuperView from "./Components/SuperAdmin/SuperView";
import SuperEdit from "./Components/SuperAdmin/SuperEdit";
import NotificationDetail from "./Components/SuperAdmin/NotificationDetail";
import PrivateRoute from "./Components/PrivateRoute"; // adjust path if needed
import AllRequest from "./Components/dashboard/AllRequest";
import ViewRequest from "./Components/dashboard/ViewRequest";
// import Allrequests from "./Components/SuperAdmin/SuperAllrequest";
import SuperAllrequest from "./Components/SuperAdmin/SuperAllrequest";
import SuperViewRequest from "./Components/SuperAdmin/SuperViewRequest";
import SuperLayout from "./Components/SuperAdmin/SuperLayout";
import AdminPage from "./Components/SuperAdmin/AdminPage";
import EditProject from "./Components/SuperAdmin/EditProject";
import AddAdminForm from "./Components/SuperAdmin/AddAdminForm";
import Admin_Profile from "./Components/dashboard/Admin_Profile";
import SuperAdmin_Profile from "./Components/SuperAdmin/SuperAdmin_Profile";
import Employrequest from "./Components/dashboard/Employrequest";
import Eall_request from "./Components/Employees/Eall_request";
import DynamicTable from "./Components/DynamicTable";
// import EmpProjects from "./Components/Employees/Emp_project";

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin Dashboard Routes (wrapped inside Layout) */}
          <Route index element={<Default />} />
          <Route
            path="/"
            element={
             <PrivateRoute>
              <Layout />
             </PrivateRoute>
            }
          >
            <Route path="updateform/:empId" element={<Updateform />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="ranking/monthly-yearly" element={<Monthlyearly />} />
            <Route path="leave" element={<Leave />} />
            <Route path="leaveform" element={<Leave_form />} />
            <Route path="view" element={<View />} />
            <Route path="project" element={<Project />} />
            <Route path="/requests" element={<AllRequest />} />
            <Route path="/requests/:id" element={<ViewRequest />} />
            <Route path="assignment" element={<AssignProject />} />
            {/* <Route path="events" element={<Events />} /> */}
            <Route path="add-employee" element={<AddEmployeeWithAccess />} />
            <Route path="tasks/:projectId"element={<Task />} />
            <Route path="tasks/add" element={<AddTask />} />
            <Route path="my-profile" element={<Admin_Profile/>} />
            <Route path="emp-request" element={<Employrequest/>} />
          </Route>


          {/* Employee Routes (standalone, not in admin Layout) */}
          <Route path="/employee-dashboard" element={<Emp_Dashboard />} />
          <Route path="/leave-application" element={<LeaveApplicationForm />} />
          {/* <Route path="/leave-recall" element={<Emp_Leave />} /> */}
          <Route path="/emp_projecttask/:projectId" element={<EmpProjectTask />} />
          <Route path="/eTask" element={<Emp_Tasks />} />
          <Route path="emp_event" element={<Emp_EventPage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/profile" element={<My_Profile />} />
          <Route path="/eprojects" element={<EmpProjects />} />
          <Route path="/leave-application" element={<LeaveApplicationForm />} />
             <Route path="/eall-request" element={<Eall_request/>}/>

          {/* <Route path="/" element={<Login />} /> */}

          {/* New Project & Feedback Routes */}
          <Route path="/eprojects" element={<EmpProjects />} />
          <Route path="/feedback" element={<Project_Feedback />} />

          {/* Super Admin */}
          <Route path="/super-admin-login" element={<SuperAdminLogin />} />
          <Route path="/overview" element={<SuperEmpOverview />} />
          <Route path="/superdashboard" element={<SuperDashboard />} />
          <Route path="/supernavbar" element={<SuperDashboard />} />
          <Route path="/superemplist" element={<SuperEmplist />} />
          <Route path="/superleave" element={<SuperLeave />} />
          <Route path="/superproject" element={<SuperProject />} />
          <Route path="/add-employee-super" element={<SuperLayout><AddEmployeeWithAccess /></SuperLayout>} />
          <Route path="/superproject/edit/:id" element={<EditProject />} />
          <Route path="/superproject/add" element={<AddProjectForm />} />
          <Route path="/superevents" element={<SuperEvents />} />
          <Route path="/superview" element={<SuperView />} />
          <Route path="/superedit/:employeeId" element={<SuperEdit />} />
          <Route path="/notify/:id" element={<NotificationDetail />} />
          <Route path="/superedit/:notificationId/:employeeId" element={<SuperEdit />} />
          <Route path="/superview-request/:id" element={<SuperLayout><SuperViewRequest /></SuperLayout>} />
          <Route path="/superprofile" element={<SuperAdmin_Profile />} />

          <Route path="/superAllrequest" element={<SuperLayout>
            <SuperAllrequest />
          </SuperLayout>} />
         <Route path="/addadmin" element={<AdminPage />}/>
         {/* <Route path="/addadmin/form" element={<AddAdminForm/>}/> */}
       
        {/* <Route path="/emp-project" element={<EmpProjects/>}/> */}




          {/* Catch all redirect */}
          <Route path="*" element={<EmpProjects />} />
          <Route path="/pagination" element={<DynamicTable/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


