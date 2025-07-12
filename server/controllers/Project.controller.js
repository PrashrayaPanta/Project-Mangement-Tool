import Project from "../models/project.model.js";

export default async function createProjectController(req, res) {

  // console.log("Hello I am inside the project Controller")

  const { title, deadline, tasks } = req.body;

  console.log(typeof tasks);
  
  // Validate Title field inside tasks
  tasks?.map(({title}) =>{

    if(!title){
        throw new customError("Task Title is required", 400)
    }
  })


// Valid Title field if empty or no field propvided
  if(!title){
      throw new customError("Title is required", 400)
  }

    // Create project
    const project = await Project.create({
      title,
      deadline,
      tasks,
    });



    res.status(201).json({ message: "Project created successfully", project });



  }


export const getProjects = async(rqe, res) =>{


  const projects = await Project.find();

  console.log(projects);
  


  res.json({success:true, projects})



}