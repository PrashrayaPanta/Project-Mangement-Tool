import Project from "../models/project.model.js";

export default async function ProjectController(req, res) {
  console.log("Hello I am project controller");

  try {
    const { title, deadline, tasks } = req.body;

    // Validate tasks array
    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ error: "Tasks must be an array." });
    }

    for (const task of tasks) {
      if (!task.title || task.title.trim() === "") {
        return res.status(400).json({ error: "Each task must have a non-empty title." });
      }
    }

    // Create project
    const project = await Project.create({
      title,
      deadline,
      tasks,
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}