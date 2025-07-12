import axios from "axios";
import React, { useEffect, useState } from "react";




const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch existing projects from the server

    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>

    <div className="text-right">
    <button className="bg-blue-600 p-3 mb-4" onClick={() => window.location.href = "/projects/create"}>
            Add Projects
      </button>
    </div>
   

   

      <div>
        {projects.map((project) => (
          <div key={project._id} className="p-4 border rounded mb-4">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-600">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
            <ul className="mt-2">
              {project.tasks.map((task, index) => (
                <li key={index} className="text-sm text-gray-800">
                  <h1>Title: {task.title}</h1>
                  <h1>- Status: {task.status}</h1>
                  <button className="bg-red-600 p-3">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>


      
    </>
  );
};

export default ProjectsList;
