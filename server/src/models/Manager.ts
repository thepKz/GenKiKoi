import mongoose from "mongoose";

interface IManager {
  userId: mongoose.Types.ObjectId;
  position?: string;
  startDate: Date;
}

const ManagerSchema = new mongoose.Schema<IManager>(
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
