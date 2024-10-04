import mongoose from "mongoose";

interface IFish {
  description?: string;
  size: number;
  age: number;
  photoUrl?: string;
  numberOfTreatments: number;
  customerId: string;
  healthStatus: string;
  appointmentId: string;
  medicalRecordId: string;
}

const FishSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    size: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    photoUrl: {
      type: String,
    },
    numberOfTreatments: {
      type: Number,
      required: true,
    },
    healthStatus: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
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
  {
    timestamps: true,
  }
);

const Fish = mongoose.model<IFish>("Fish", FishSchema);
export default Fish;
