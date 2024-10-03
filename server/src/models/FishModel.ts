import mongoose from "mongoose";

interface IFish {
  customerId: string;
  description?: string;
  size?: number;
  age?: number;
  photoUrl?: string;
  appointmentId: string;
  medicalRecordId: string;
}

const FishSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    description: {
      type: String,
    },
    size: {
      type: Number,
    },
    age: {
      type: Number,
    },
    photoUrl: {
      type: String,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    medicalRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },
  },
  { timestamps: true }
);

const Fish = mongoose.model<IFish>("Fish", FishSchema);

export default Fish;
