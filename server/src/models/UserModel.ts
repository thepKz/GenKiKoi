import mongoose from "mongoose";

// Interface defining the structure of a User document
interface IUser {
  username: string;
  email: string;
  password: string;
  photoUrl?: string;
  fullName?: string;
  phoneNumber?: string;
  role: "customer" | "staff" | "doctor" | "manager";
}

// Mongoose schema for the User model
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoUrl: { type: String, default: "" },
    fullName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    role: {
      type: String,
      enum: ["customer", "staff", "doctor", "manager"],
      default: "customer",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create and export the User model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
