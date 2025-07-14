import React, { useEffect, useState } from "react";
import http from "../../http";
import { dtFormat, FromStorage } from "../../library";
import LoadingComponent from "../../components/ui/LoadingComponent";
import SubmitButton from "../../components/ui/SubmitButton";
import { Formik } from "formik";
import { Link } from "react-router-dom";




const List = () => {
  const token = FromStorage("adminToken");

  const [projects, setProjects] = useState([]);

  console.log(projects);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setLoading(true);

    try {
      const { data } = await http.get("/api/admin/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(data.projects);

      // setProjects(data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-7 sm:px-7 lg:px-28">
      <div className="mt-3 text-right">

        <Link className="bg-black text-white py-2 px-6" to="/project/create">Add</Link>
      </div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {projects.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Projects</th>
                  {/* <th>Deadline</th> */}
                  <th>Tasks</th>
                </tr>

              </thead>

              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"} // Alternate row colors
                  >
                    <td>{project.title}</td>
                    <td>
                      {!project.deadline ? "No" : dtFormat(project.deadline)}
                    </td>
                    <td>{dtFormat(project.createdAt)}</td>
                    <td>
                      {project.tasks?.map((task, index) => (
                        <tr key={index}>
                          <td>{task.title}</td>
                          <td>{!task.deadline ? "No" : dtFormat(task.deadline)}</td>
                          <td>{task.status}</td>
                          <td>
                            <button className="bg-red-500">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </td>
                    <td>{console.log(project.tasks)}</td>
                    <td>Delete</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>No Projects</h1>
          )}
        </>
      )}
    </div>
  );
};

export default List;
