import HandleError from "../utils/handleError.js";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendToken from "../utils/sendToken.js";

const createRegisterUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new HandleError("Please fill  all required fields", 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new HandleError("User is already exist", 400));
    }
    const user = await User.create({ name, email, password });
    return sendToken(user, 201, res, "User registered successfully");
  } catch (error) {
      next(error)
   
  }
};

export { createRegisterUser };
