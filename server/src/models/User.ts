import mongoose from "mongoose";
export interface IUser {
  username: string;
  email: string;
  password: string;
  photoUrl?: string;
  fullName?: string;
  phoneNumber?: string;
  role: "customer" | "staff" | "doctor" | "manager";
  gender?: "nam" | "nữ";
  isDisabled: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
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
      type: String,
      enum: ["nam", "nữ"],
      default: "nam",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
