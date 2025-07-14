
import customError from '../middleware/error-handler-middleware.js';
import  User  from '../models/user.model.js';


import 'dotenv/config'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const GetProfileController = async(req, res)=>{

  try{

    //The loginned user is present in req.user


    const user = await User.findById(req.user.id).select("-password");


    if(!user){
        throw new customError("User not found", 404);
    }
    res.json({
        message: "User Profile",
        user
    });


  }catch(error){

    next(error);

  }
         
      

}


const EditProfileController = async(req, res, next) =>{

  try{
    const { username, email } = req.body;


    console.log(username, email)

    
    const userFound = await User.findById(req.user.id);


    console.log(userFound);
    




    //! Check if the user is trying to update the same username and email

    if(userFound.username === username && userFound.email === email){
        throw new customError("You are trying to update the same username and email", 400);
    }


    //! Returned the document after updation takes place if new:true
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select("-password");


    // console.log(updatedUser);

    res.status(201).json({ message: "Updated Succesfully", user: updatedUser });

 
  }catch(error){

    next(error);

  } 

}



const ChangePasswordController = async(req, res) =>{


  try{

       //! Updating the password

       const { OldPassword } = req.body;

       const user = await User.findById(req.user.id);
   
       console.log(user);
       
   
       const isMatch = await bcrypt.compare(OldPassword, user.password);
   
       if (!isMatch) {
         return res
           .json({ message: "You cannot change the paasssword" })
           .status(401);
       }
   
       const { newPassword } = req.body;
   
       //!hash the password
   
       const salt = await bcrypt.genSalt(10);
   
       const hashedPassword = await bcrypt.hash(newPassword, salt);
   
       const userupdated = await User.findByIdAndUpdate(
         req.user.id,
         { password: hashedPassword },
         { new: true }
       ).select("-password");
   
       res
         .json({ message: "Updated the password", data: userupdated })
         .status(201);


      }catch(error){

        next(error)
      }

}




export {GetProfileController, EditProfileController, ChangePasswordController}