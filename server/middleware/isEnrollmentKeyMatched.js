import Project from "../models/project.model.js";
import customError from "./error-handler-middleware.js";


export const isEnrollmentKeyMatched = async(req, res, next) =>{

    const {enrollmentKey} = req.body;


    console.log(enrollmentKey);
    



    const projectfound = await Project.findOne({ EnrollmentKey: enrollmentKey});


    if(projectfound){
        next();


        console.log(req.params);
        

    }else{


        throw new customError("Invalid credentials", 400)


    }





}