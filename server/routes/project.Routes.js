import express from "express";
import CreateProjectController from "../controllers/Project.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";


import isAdmin from "../middleware/isAdmin.middleware.js";




const projectRoute = express.Router();


// User registration route

projectRoute.post("/", isAuthenticated, isAdmin, CreateProjectController);




// User login route

// projectRoute.post("/login", LoginController);


export default projectRoute;


