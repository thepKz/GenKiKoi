import mongoose from "mongoose";

interface IFish {
  description?: string;
  size: number;
  age: number;
  photoUrl?: string;
  numberOfTreatments: number;
  healthStatus: string;
  customerId: mongoose.Types.ObjectId;
  appointmentId: mongoose.Types.ObjectId;
  medicalRecordId: mongoose.Types.ObjectId;
}

const FishSchema = new mongoose.Schema<IFish>(
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
      default: 0,
    },
    healthStatus: {
      type: String,
      enum: ["Tốt", "Xấu", "Cần theo dõi"],
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
