import express from "express";


import {LoginController} from "../controllers/auth.controller.js";
import {RegisterController} from "../controllers/auth.controller.js";






const authRoute = express.Router();


// User registration route

authRoute.post("/register", RegisterController);


// User login route

authRoute.post("/login", LoginController);


export default authRoute;


