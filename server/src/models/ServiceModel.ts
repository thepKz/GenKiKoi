import mongoose, { Schema, Document } from "mongoose";

const ServiceSchema: Schema = new Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
