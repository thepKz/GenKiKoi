import mongoose from "mongoose";

interface IDoctor {
  specialization: string;
  licenseNumber: string;
  yearOfExperience?: number;
  movingService: boolean;
  userId: mongoose.Types.ObjectId;
  startDate: Date;
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
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
