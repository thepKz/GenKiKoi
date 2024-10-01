import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    photo_link: {
      type: String,
      default: null,
    },
    speciality: {
      type: String,
    },
    lisence_number: {
      type: String,
      unique: true,
    },
    year_of_experience: {
      type: Number,
    },
    moving_service: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
