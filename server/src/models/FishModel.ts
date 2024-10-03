import mongoose, { Schema, Document } from "mongoose";
const fishSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    photo_url: {
      type: String,
      default: null,
    },
    number_of_treatments: {
      type: Number,
      required: true,
    },
    health_status: {
      type: String,
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Fish = mongoose.model("Fish", fishSchema, "fishes");
export default Fish;
