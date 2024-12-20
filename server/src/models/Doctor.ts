import mongoose from "mongoose";
import { IUser } from "./User";

export interface IDoctor {
  specialization: string;
  licenseNumber: string;
  yearOfExperience?: number;
  movingService: boolean;
  userId: IUser;
  startDate?: Date;
  introduction?: string;
  _id: string;
  googleMeetLink: string;
}

const DoctorSchema = new mongoose.Schema<IDoctor>(
  {
    specialization: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      unique: true,
      required: true,
    },
    yearOfExperience: {
      type: Number,
    },
    movingService: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      default: () => new Date(),
    },
    introduction: {
      type: String,
    },
    googleMeetLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
