import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  fullname: string;
  photoUrl?: string;
  role: "customer" | "staff" | "veterinarian" | "manager";
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    photoUrl: { type: String, default: "" },
    role: {
      type: String,
      enum: ["customer", "staff", "veterinarian", "manager", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
