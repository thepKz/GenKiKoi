import mongoose from "mongoose";
import { ICustomer } from "./Customer";
import { IAppointment } from "./Appointment";

interface IFish {
  customerId: ICustomer;
  description?: string;
  size: number;
  age: number;
  photoUrl?: string;
  gender: "đực" | "cái";
}

const FishSchema = new mongoose.Schema<IFish>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    gender: {
      type: String,
      enum: ["đực", "cái"],
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
  },
  {
    timestamps: true,
  }
);

const Fish = mongoose.model<IFish>("Fish", FishSchema, "fishes");
export default Fish;
