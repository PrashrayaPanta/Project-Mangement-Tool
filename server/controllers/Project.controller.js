import Project from "../models/project.model.js";

import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat.js";
import customError from "../middleware/error-handler-middleware.js";

dayjs.extend(LocalizedFormat);

export const dtFormat = (dt, format = "lll") => dayjs(dt).format(format);

export const createProject = async (req, res, next) => {
  try {
    // Fetch the last project to determine the next incrementing number
    const lastProject = await Project.findOne().sort({ createdAt: -1 });

    const baseNumber = 1814230; // Base number to maintain the same number of digits
    const increment = lastProject?.EnrollmentKey
      ? parseInt(lastProject.EnrollmentKey.toString().slice(-1)) + 1
      : 5;

    const projectNumber = parseInt(
      baseNumber.toString().slice(0, -1) + (increment % 10)
    ); // Replace only the last digit

    console.log("Generated Enrollment Key:", projectNumber);

    const { title, deadline, tasks } = req.body;

    // Validate Title field inside tasks
    tasks?.map(({ title }) => {
      if (!title) {
        throw new customError("Task Title is required", 400);
      }
    });

    // Validate Title field if empty or not provided
    if (!title) {
      throw new customError("Title is required", 400);
    }

    // Create project
    const project = await Project.create({
      title,
      deadline,
      tasks,
      EnrollmentKey: projectNumber,
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    console.log(projects);

    res.json({ success: true, projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectsByNormalUser = async (req, res) => {
  try {
    const projects = await Project.find().select("-EnrollmentKey -tasks");

    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectTasksById = async (req, res) => {
  try {
    const { id } = req.params;

    const projects = await Project.findById(id);

    console.log(projects);

   const completedTask =  projects?.tasks.filter((task) => task.status === "Completed");


   console.log(completedTask);



   const noofCompletedTask = completedTask.length;


   console.log(noofCompletedTask);
   


   const incompletedTask = projects.tasks.filter((task) => task.status !== "Completed" );



   console.log(incompletedTask);


   const noofincompletedTasks = incompletedTask.length;



   console.log(noofincompletedTasks);
   




   console.log();
   



   
   
   

    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
};

export const UpdateCertainProjectTask = async (req, res, next) => {
  try {
    const { projectId, taskId } = req.params;
    const { status } = req.body;

    const project = await Project.findById(projectId);
    if (!project) throw new customError("Project not found");

    if (new Date() > new Date(project.deadline)) {
      throw new customError("Deadline is crossed, cannot update the status");
    }

    // Update task status using findOneAndUpdate and positional operator $
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, "tasks._id": taskId },
      { $set: { "tasks.$.status": status } },
      { new: true }
    );

    if (!updatedProject) {
      throw new customError("Task not found in the project");
    }

    console.log("Updated project with task status:", updatedProject);
  } catch (error) {
    next(error);
  }
};


//Tracking progress


// no of completed tasks


// no of incompleted tasks 


// Progess = 
