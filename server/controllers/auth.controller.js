import customError from "../middleware/error-handler-middleware.js";
import User from "../models/user.model.js";

import "dotenv/config";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RegisterController = async (req, res, next) => {

  console.log("I am Register Controlller");
  
  try {
    const { username, email, password } = req.body;

    //! Empty Field Validation
    if (!email || !username || !password) {
      throw new customError("This field is required", 400);
    }

    //! Email Validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new customError("Invalid email format", 400);
    }

    const userFound = await User.findOne({ email });

    if (userFound) {
      throw new customError("User already exists", 400);
    }

    //! Hash the user password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    //! create the user

    const userCreated = await User.create({
      username,
      password: hashedPassword,
      email,
      profileImageUrl: req?.file?.path,
    });

    console.log(userCreated);

    //! send the response

    res.json({
      message: "Register Success",
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  } catch (error) {
    next(error);
  }
};

const LoginController = async (req, res, next) => {
  try {
    console.log("Helo I am iunside login controler");

    const { email, password } = req.body;

    //! check if user email exits

    const user = await User.findOne({ email });

    if (!user) {
      throw new customError("Invalid Credentials", 401);
    }

    //! check if user password is valid

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new customError("Invalid Credentials", 400);
    }

    //! Genrate the token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};

export { RegisterController, LoginController };
