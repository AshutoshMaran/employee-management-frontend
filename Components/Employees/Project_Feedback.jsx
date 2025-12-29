import React, { useState } from "react";
import { Link } from "react-router-dom";

const Project_Feedback = () => {
  const [projects, setProjects] = useState({
    "To Do": [
      {
        id: 1,
        title: "Project UI Kit (Gym App)",
        dueDate: "Nov 20, 2025",
        completed: 0,
        total: 50,
        tools: ["Figma", "PS"],
      },
      {
        id: 2,
        title: "Sketch Home Page (School App)",
        dueDate: "Nov 26, 2025",
        completed: 10,
        total: 50,
        tools: ["Sketch", "AI"],
      },
    ],
    "In Progress": [
      {
        id: 3,
        title: "Web Design (App to Web)",
        dueDate: "Nov 25, 2025",
        completed: 75,
        total: 100,
        tools: ["Adobe XD"],
      },
    ],
    "Work Done": [
      {
        id: 4,
        title: "Web Design (Real Estate)",
        dueDate: "Nov 20, 2025",
        completed: 50,
        total: 50,
        tools: ["Figma", "AI"],
      },
    ],
    "Work in Review": [
      {
        id: 5,
        title: "Prototyping (Payment App)",
        dueDate: "Nov 12, 2025",
        completed: 50,
        total: 50,
        tools: ["Figma", "InDesign"],
      },
    ],
  });

  const handleFeedbackSubmit = (column, id, progress, issues, feedback) => {
    console.log(`Feedback for project ${id} in '${column}' column:`);
    console.log(`Progress: ${progress}%`);
    console.log(`Issues: ${issues}`);
    console.log(`Feedback: ${feedback}`);
    alert(" Feedback submitted! Check the console.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-10 px-4">
      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">
         <span className="text-blue-600">Feedbacks</span>
        </h1>
        <Link
          to="/projects"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
        >
          Back to Projects
        </Link>
      </div>

      <div className="flex flex-wrap gap-8 justify-center max-w-6xl mx-auto">
        {Object.entries(projects).map(([status, items]) => (
          <div
            key={status}
            className="w-full md:w-80 bg-white border border-gray-200 rounded-2xl shadow-md p-6 transition hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
              {status}
            </h2>

            <div className="space-y-6">
              {items.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Due: <span className="font-medium">{project.dueDate}</span>
                  </p>

                  <div className="text-sm mb-2">
                    <span className="font-medium">
                      Progress: {project.completed}/{project.total}
                    </span>
                    <span className="text-xs text-gray-400 float-right">
                      {Math.round((project.completed / project.total) * 100)}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={project.total}
                    value={project.completed}
                    onChange={(e) => {
                      const updated = { ...projects };
                      const proj = updated[status].find((p) => p.id === project.id);
                      proj.completed = Number(e.target.value);
                      setProjects(updated);
                    }}
                    className="w-full accent-blue-600"
                  />

                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <textarea
                    placeholder="Any issue faced?"
                    className="mt-4 w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                    onChange={(e) => (project.issues = e.target.value)}
                  />
                  <textarea
                    placeholder="Feedback or update..."
                    className="mt-2 w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                    onChange={(e) => (project.feedback = e.target.value)}
                  />

                  <button
                    onClick={() =>
                      handleFeedbackSubmit(
                        status,
                        project.id,
                        project.completed,
                        project.issues || "",
                        project.feedback || ""
                      )
                    }
                    className="mt-4 w-full bg-blue-600 text-white py-2 text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Submit Feedback
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project_Feedback;
