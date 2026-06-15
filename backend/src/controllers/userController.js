import HandleError from "../utils/handleError.js";
import User from "../model/userModel.js";
import sendToken from "../utils/sendToken.js";
import validator from "validator";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

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
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = req.user;
    if (!email || !email.trim()) {
      return next(new HandleError("Email is required", 400));
    }
    if (email && email !== user.email) {
      const emailExsting = await User.findOne({ email });
      if (emailExsting) {
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
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const requestForgotPassword = async (req, res, next) => {
  let user;
  try {
    const { email } = req.body;
    if (!email) {
      return next(new HandleError("Please Enter valid email", 400));
    }
    user = await User.findOne({ email });
    if (!user) {
      return next(new HandleError("User not found with this email", 404));
    }
    const resetToken = await user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.RESET_PASSWORD_URL}/reset-password/${resetToken}`;
    const message = `Click this link to reset your password: ${resetUrl}`;
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    return res.status(200).json({
      success: true,
      email: user.email,
      message: `Password reset email sent successfully to email: ${email}`,
    });
  } catch (error) {
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }

    return next(new HandleError("Email could not be sent", 500));
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return next(
        new HandleError("Please provide password and confirm password", 400),
      );
    }
    if (password !== confirmPassword) {
      return next(new HandleError("Passwords do not match", 400));
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new HandleError("Reset token is invalid or has expired", 400),
      );
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !oldPassword || !confirmPassword) {
      return next(new HandleError("Please provide all password fields", 400));
    }
    if (newPassword !== confirmPassword) {
      return next(
        new HandleError("New password and confirm password do not match", 400),
      );
    }
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return next(new HandleError("User not found", 404));
    }
    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
      return next(new HandleError("Old password is incorrect", 400));
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// get All User List by Admin
const getAllUserByAdmin = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();
    console.log(users);
    if (!users) {
      return next(new HandleError("Users not exists", 400));
    }

    res.status(200).json({
      success: true,
      message: "All Users Fetched Successfully ",
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single User by Admin
const getSingleUserByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password").lean();
    if (!user) {
      return next(new HandleError("User not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Update User Role

const updateRoleByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!role) {
      return next(new HandleError("Please provide a role", 400));
    }
    if (!["user", "admin"].includes(role)) {
      return next(new HandleError("Invalid role value", 400));
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return next(new HandleError("User not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete User by Admin

const deleteUserByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (req.user._id.toString() === userId) {
      return next(new HandleError("Admin cannot delete own account", 400));
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(new HandleError("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createRegisterUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  updatePassword,
  requestForgotPassword,
  resetPassword,
  getAllUserByAdmin,
  getSingleUserByAdmin,
  updateRoleByAdmin,
  deleteUserByAdmin,
};
