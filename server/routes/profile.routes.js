import express from "express";


import isAuthenticated from "../middleware/auth.middleware.js";
import { EditProfileController, GetProfileController ,ChangePasswordController } from "../controllers/profile.controller.js";




const profileRoute = express.Router();


//get the profile

profileRoute.get("/", isAuthenticated,  GetProfileController);


// User login route

profileRoute.put("/edit", isAuthenticated, EditProfileController );




///Change the password
profileRoute.put("/change-password", isAuthenticated, ChangePasswordController);


export default profileRoute;


