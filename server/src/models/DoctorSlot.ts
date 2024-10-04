import mongoose from "mongoose";

interface IDoctorSlot {
  timeServiceId: string;
  doctorId: string;
  status: string;
}

const DoctorSlotSchema = new mongoose.Schema(
  {
    timeServiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeService",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DoctorSlot = mongoose.model<IDoctorSlot>("DoctorSlot", DoctorSlotSchema);
export default DoctorSlot;

