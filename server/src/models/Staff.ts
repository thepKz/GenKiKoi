import mongoose from "mongoose";
import { IUser } from "./User";

interface IStaff {
  userId: IUser;
  position?: "Hỗ trợ khách hàng" | "Tiếp tân" | "Trợ lý" | "Thu ngân";
  workShift?: "Sáng" | "Chiều";
  isAvailable: boolean;
  startDate: Date;
}

const StaffSchema = new mongoose.Schema<IStaff>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
      enum: ["Hỗ trợ khách hàng", "Tiếp tân", "Trợ lý", "Thu ngân"],
      default: "Hỗ trợ khách hàng",
    },
    workShift: {
      type: String,
      enum: ["Sáng", "Chiều"],
      default: "Sáng",
    },
    isAvailable: { type: Boolean, default: true },
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model<IStaff>("Staff", StaffSchema);
export default Staff;
