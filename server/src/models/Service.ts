import mongoose from "mongoose";

interface IService {
  serviceName: string;
  price: number;
}

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;
