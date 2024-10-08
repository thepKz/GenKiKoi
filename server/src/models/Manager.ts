import mongoose from "mongoose";

interface IManager {
  userId: string;
  position?: string;
  startDate: string;
}

const ManagerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: String,
    },
    startDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Manager = mongoose.model<IManager>("Manager", ManagerSchema);

export default Manager;
