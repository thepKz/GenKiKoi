import mongoose from "mongoose";

interface IStaff {
  userId: string;
  position?: string;
  workShift: string;
  isAvailable: boolean;
  startDate: string;
}

const StaffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
    },
    workShift: {
      type: String,
      enum: ["Morning", "Afternoon", "Night"],
      required: true,
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
