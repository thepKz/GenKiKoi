import mongoose from "mongoose";
import { ICustomer } from "./Customer";
import { IAppointment } from "./Appointment";

interface IFish {
  description?: string;
  size: number;
  age: number;
  photoUrl?: string;
  numberOfTreatments?: number;
  healthStatus: string;
  customerId: ICustomer;
  appointmentId: IAppointment;
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
  },
  {
    timestamps: true,
  }
);

const Fish = mongoose.model<IFish>("Fish", FishSchema);
export default Fish;
