import express from "express";
import CreateProjectController from "../controllers/Project.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";


import isAdmin from "../middleware/isAdmin.middleware.js";


import { getProjects } from "../controllers/Project.controller.js";

const projectRoute = express.Router();


// User registration route

projectRoute.post("/", isAuthenticated, isAdmin, CreateProjectController);




projectRoute.get("/", getProjects);




// User login route

// projectRoute.post("/login", LoginController);


export default projectRoute;


