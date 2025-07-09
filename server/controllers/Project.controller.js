import Project from "../models/project.model.js";

export default async function CreateProjectController(req, res) {




  console.log("Hello I am inside the project Controller");

    // const { title, deadline, tasks } = req.body;

    // // Validate tasks array

    // if(!title){
    //     return res.status(400).json({ error: "Project title is required." });
    // }


    // if (!tasks) {
    //   return res.status(400).json({ error: "Tasks must be an array." });
    // }

 

    // Create project
    const project = await Project.create({
      title,
      deadline,
      tasks,
    });

    res.status(201).json({ message: "Project created successfully", project });



  }