import HandleError from "../utils/handleError.js";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

const createRegisterUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return next(new HandleError("Please fill the all required filed", 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new HandleError("User is already exist", 400));
    }
    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);

    res.cookie("token" , token , {
       httpOnly: true,
       sameSite: "strict",
       maxAge: 7*24*60*60*1000,
    })
    res.status(201).json({
      success: true,
      user,
      message: "User register successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createRegisterUser };
