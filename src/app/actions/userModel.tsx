import { image } from "@nextui-org/theme";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

    utrRating: {
      type: [],
      default: [],
    },
    experience: {
      type: String,
      default: "",
    },
    playStyle: {
      type: String,
      default: "",
    },
    courtSurface: {
      type: [String],
      default: [],
    },
    availability: {
      type: [String],
      default: [],
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.tb_users || mongoose.model("tb_users", userSchema);

export default User;
