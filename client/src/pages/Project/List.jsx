import React, { useEffect, useState } from "react";
import http from "../../http";
import { FromStorage } from "../../library";
import LoadingComponent from "../../components/ui/LoadingComponent";

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
      const {data} = await http.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data.projects);

      setProjects(data.projects);
      


    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          {projects.length > 0 ? (
            <div>

                <h1>List Of all projects</h1>

            </div>
          ) : (
            <h1>No Projects</h1>
          )}
        </>
      )}
    </div>
  );
};

export default List;
