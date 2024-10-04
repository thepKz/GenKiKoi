import mongoose from "mongoose";

interface ITimeService {
  serviceId: string;
  timeSlotId: string;
}

const TimeServiceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlot",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TimeService = mongoose.model<ITimeService>(
  "TimeService",
  TimeServiceSchema
);

export default TimeService;
