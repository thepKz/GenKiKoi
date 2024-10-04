import mongoose from "mongoose";

interface IDoctor {
  specialization: string;
  licenseNumber: string;
  yearOfExperience?: number;
  movingService?: boolean;
  userId: string;
}

const DoctorSchema = new mongoose.Schema(
  {
    specialization: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      unique: true,
      require: true,
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
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
