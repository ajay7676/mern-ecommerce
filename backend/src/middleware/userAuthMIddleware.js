import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import HandleError from "../utils/handleError.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new HandleError("Please login to access this resource", 401));
    }
     if (!process.env.JWT_SECRET_KEY) {
      return next(new HandleError("JWT secret key is missing", 500));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(new HandleError("User not found or token is invalid", 401));
    }

    req.user = user;
    next();
  } catch (error) {
     if (error.name === "JsonWebTokenError") {
      return next(new HandleError("Invalid token. Please login again", 401));
    }

    if (error.name === "TokenExpiredError") {
      return next(new HandleError("Token expired. Please login again", 401));
    }

    next(error);
  }
};

export { userAuth };
