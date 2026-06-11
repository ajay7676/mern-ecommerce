import HandleError from "../utils/handleError.js";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendToken from "../utils/sendToken.js";
import validator from "validator";

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
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HandleError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new HandleError("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new HandleError("Invalid email or password", 401));
    }
    return sendToken(user, 200, res, "User Login successfully");
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const getProfile = async (req, res, next) => {
  try {
    const { _id, name, email } = req.user;
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: {
        id: _id,
        name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name ,email} = req.body;
    const user = req.user;
    if (!email || !email.trim()) {
      return next(new HandleError("Email is required", 400));
    }
      if(email && email !== user.email){
         const emailExsting = await User.findOne({email});
          if(emailExsting){
             return next(new HandleError("Email already exists", 400));
          }
            user.email = email;
      }

     if (!name || !name.trim()) {
        return next(new HandleError("Name is required", 400));
      }
      

    if (name) {
      if (!validator.isLength(name.trim(), { min: 3, max: 25 })) {
        return next(
          new HandleError("Name must be between 3 and 25 characters", 400),
        );
      }
       user.name = name;
    }
    await user.save();
      return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
    });
  } catch (error) {
    next(error);
  }
};

export { createRegisterUser, loginUser, logoutUser, getProfile, updateProfile };
