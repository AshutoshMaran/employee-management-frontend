import React, { useEffect, useState } from 'react';

  const Emp_Page = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user && token) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [taskRes, projectRes, leaveRes, attendanceRes] = await Promise.all([
        fetch(`http://localhost:3001/employee/tasks/${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`http://localhost:3001/employee/projects/${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`http://localhost:3001/employee/leaves/${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`http://localhost:3001/employee/attendance/${user.id}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setTasks(await taskRes.json());
      setProjects(await projectRes.json());
      setLeaves(await leaveRes.json());
      setAttendance(await attendanceRes.json());
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Work Dashboard</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">My Tasks</h3>
        {tasks.map(task => (
          <div key={task.id} className="p-4 bg-gray-100 rounded my-2">
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Start:</strong> {task.startDate}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
          </div>
        ))}
      </section>

    
      <section className="mb-6">
        <h3 className="text-xl font-semibold">My Projects</h3>
        {projects.map(project => (
          <div key={project.id} className="p-4 bg-gray-100 rounded my-2">
            <p><strong>Name:</strong> {project.name}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Start:</strong> {project.startDate}</p>
            <p><strong>Deadline:</strong> {project.deadline}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold">My Leaves</h3>
        {leaves.map((leave, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded my-2">
            <p><strong>From:</strong> {leave.from}</p>
            <p><strong>To:</strong> {leave.to}</p>
            <p><strong>Status:</strong> {leave.status}</p>
          </div>
        ))}
      </section>
      

      <section>
        <h3 className="text-xl font-semibold">My Attendance</h3>
        {attendance.map((record, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded my-2">
            <p><strong>Date:</strong> {record.date}</p>
            <p><strong>Status:</strong> {record.status}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Emp_Page;
