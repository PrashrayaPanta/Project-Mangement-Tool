import jwt from "jsonwebtoken";
import 'dotenv/config';
import customError from "./error-handler-middleware.js";

const isAuthenticated = async (req, res, next) => {

    console.log(req.headers);

  // get the token from header

  const headerObject = req.headers;

  // console.log(headerObject)

  const token = headerObject?.authorization?.split(" ")[1];

  // verify the token

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //if the token is temnpered
    if (err) {
      return false;
      // if token is not tempered
    } else {
      return decoded;
    }
  });

  //save the user into req.boj

  // console.log(verifyToken);

  // const user_id = verifyToken.id;

  // console.log(user_id);

  if (verifyToken) {
    console.log(verifyToken.id);
    // req.user.id = verifyToken.id;

    req.user = verifyToken;


    console.log(req.user);
    


    next();
  } else {
    throw new customError("Token Expired plz login in", 401);
  }
};

export default isAuthenticated;
