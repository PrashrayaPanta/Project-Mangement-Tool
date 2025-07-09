import User from "../models/user.model.js";
import customError from "../middleware/error-handler-middleware.js";



const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);


    if (!user || !user.isAdmin) {
        throw new customError("You are not authorized to perform this action", 403);
    }

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
