import mongoose from "mongoose";
interface IUser {
  username: string;
  email: string;
  password: string;
  photoUrl: string;
  fullName: string;
  phoneNumber: string;
  role: "customer" | "staff" | "doctor" | "manager";
  gender: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
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
    gender: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
