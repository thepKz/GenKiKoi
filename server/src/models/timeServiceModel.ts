import mongoose from "mongoose";

const TimeServiceSchema = new mongoose.Schema(
  {
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    timeSlot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Time",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TimeService = mongoose.model(
  "TimeService",
  TimeServiceSchema,
  "timeServices"
);

export default TimeService;
