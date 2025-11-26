import React, { useState } from 'react';

const ProjectCard = ({ project, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(project);

  if(editing){
    return (
      <form onSubmit={(e)=>{
        e.preventDefault();
        onEdit(formData);
        setEditing(false);
      }}>
        <input value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} />
        <button type="submit">Save</button>
      </form>
    )
  }

  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p>{project.startDate} - {project.endDate}</p>
      <p>{project.technologies.join(', ')}</p>
      <p>Admin: {project.admin}</p>
      <button onClick={()=>setEditing(true)}>Edit</button>
    </div>
  );
};

export default ProjectCard;
