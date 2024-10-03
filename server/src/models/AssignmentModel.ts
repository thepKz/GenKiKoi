import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    timeService_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeService",
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    status: {
      type: String,
      enum: ["busy", "available"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", AssignmentSchema);

export default Assignment;
