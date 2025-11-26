import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import SuperLayout from "./SuperLayout";
import AddProjectForm from "./AddProjectForm";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const proj = projects.find((p) => String(p.id) === String(id));
    setProject(proj);
  }, [id]);

  const handleSave = (updatedProject) => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const updated = projects.map((p) =>
      String(p.id) === String(id) ? updatedProject : p
    );
    localStorage.setItem("projects", JSON.stringify(updated));
    navigate("/superproject"); 
  };

  if (!project) return <p className="p-6">Project not found!</p>;

  return (
    // <SuperLayout>
      <AddProjectForm project={project} onSave={handleSave} />
    // </SuperLayout>
  );
};

export default EditProject;
