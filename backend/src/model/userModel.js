import mongoose from "mongoose";
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [30, "Name cannot be more than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          if (!value) return true;
          return validator.isMobilePhone(value, "en-IN");
        },
        message: "Please enter a valid phone number",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "India",
      },
      pinCode: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save" , async function (next) {

    // If password is not modified, skip hashing
    if(!this.isModified("password")){
       return ;
    }

  this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
