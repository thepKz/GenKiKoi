import mongoose from "mongoose";

interface ITimeSlot {
  stateTime: string;
  endTime: string;
}

const TimeSlotSchema = new mongoose.Schema(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const TimeSlot = mongoose.model<ITimeSlot>("TimeSlot", TimeSlotSchema);

export default TimeSlot;
