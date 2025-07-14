import express from "express";
import { createProject, getProjectsByNormalUser, getProjectTasksById, UpdateCertainProjectTask } from "../controllers/Project.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";


import isAdmin from "../middleware/isAdmin.middleware.js";


import { getProjects } from "../controllers/Project.controller.js";
import { isEnrollmentKeyMatched } from "../middleware/isEnrollmentKeyMatched.js";






const projectRoute = express.Router({ mergeParams: true });


// User registration route

projectRoute.post("/admin/projects", isAuthenticated, isAdmin, createProject);




projectRoute.get("/admin/projects", getProjects);


projectRoute.get("/projects", getProjectsByNormalUser);



projectRoute.get("/projects/:id/tasks", isEnrollmentKeyMatched, getProjectTasksById);


projectRoute.put("/projects/:projectId/tasks/:taskId", isEnrollmentKeyMatched,  UpdateCertainProjectTask)








// User login route

// projectRoute.post("/login", LoginController);


export default projectRoute;


