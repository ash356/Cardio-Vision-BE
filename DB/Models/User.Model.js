import moment from "moment";
import mongoose, { model, Schema, Types } from "mongoose";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "FirstName Is Required"],
      min: [2, "Minimum Length 2 Chars"],
      min: [15, "Maximum Length 15 Chars"],
    },
    lastName: {
      type: String,
      required: [true, "LastName Is Required"],
      min: [2, "Minimum Length 2 Chars"],
      min: [15, "Maximum Length 15 Chars"],
    },
    userName: {
      type: String,
      required: [true, "UserName Is Required"],
      min: [2, "Minimum Length 2 Chars"],
      min: [15, "Maximum Length 15 Chars"],
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      unique: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    resetCode: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    phone: {
      type: String,
      default: "+201234567891",
    },
    gender: {
      type: String,
      default: "Male",
      enum: ["Male", "Female"],
    },
    status: {
      type: String,
      default: "OffLine",
      enum: ["OffLine", "OnLine", "Blocked"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    profilePic: Object,
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
