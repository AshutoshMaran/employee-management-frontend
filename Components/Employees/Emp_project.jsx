

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeNavbar from './Emp_Navbar';
import { apiurl } from '../../appUrl';

const EmpProjects = () => {
  const navigate = useNavigate();
  const [userName,setUserName]=useState("");
  const userEmail = "";
  const user = { name: userName, email: userEmail };
  // const token = localStorage.getItem('userToken');

  const notifications = [
    'New task assigned: Website Redesign',
    'Project deadline approaching for Dashboard Development',
  ];

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
   const [userData,setUserData]=useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${apiurl}api/employee/projects/my-projects`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
          },
          credentials:"include",
        });
      
        const data = await res.json();
        console.log("Employee Projects Data:", data);
   setUserData(data);
   setUserName(data.projects[0].employeeName)
        if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewTasks = (project) => {
    console.log(project);
    
    navigate(`/eTask`, { state: { project } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeNavbar user={user} notifications={notifications} />

      <main className="py-10 px-4 max-w-7xl mx-auto">
        <header className="text-center mb-12 relative max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Projects</h1>
          <p className="text-lg text-gray-600">
            Hi <span className="text-blue-600 font-semibold">{user.name}</span>, here are your assigned projects.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500">No projects assigned.</p>
        ) : (
          <div className="space-y-6">
            {projects.map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition relative"
              >
                <div className="flex justify-between items-start  gap-3">
                  <div className="space-y-2">
                    
                    <h2 className="text-2xl font-semibold text-gray-800">{p.title}</h2>
                    <p className="text-gray-600">{p.description}</p>

                   
                    {p.technologies && p.technologies.length > 0 && (
                      <p className="text-gray-700">
                        <span className="font-medium">Technologies:</span>{' '}
                        {p.technologies.join(', ')}
                      </p>
                    )}

                   
                    {p.roleInProject && (
                      <p className="text-gray-700">
                        <span className="font-medium">Your Role:</span> {p.roleInProject}
                      </p>
                    )}

                   
                    {p.createdBy && (
                      <div className="text-gray-700">
                        <span className="font-medium">Created By:</span>{' '}
                        {p.createdBy.name &&
                        p.createdBy.name.trim() !== '' &&
                        p.createdBy.name !== 'undefined undefined'
                          ? `${p.createdBy.name} (${p.createdBy.role || 'admin'})`
                          : 'Admin'}
                        {p.createdBy.email && (
                          <span className="text-sm text-gray-500">
                            {' '}
                            — {p.createdBy.email}
                          </span>
                        )}
                      </div>
                    )}

                  
                    {p.teamMembers && p.teamMembers.length > 0 && (
                      <p className="text-gray-700">
                        <span className="font-medium">Team Members:</span>{' '}
                        {p.teamMembers.map((e, i) => (
                          <span key={i}>
                            {e.name} ({e.role})
                            {i < p.teamMembers.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>

                 
                  <button
                    onClick={() => handleViewTasks(p)}
                    // className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    className="babsolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm w-32"
                  >
                    View Tasks
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default EmpProjects;

