import mongoose from "mongoose";

interface IService {
  serviceName: string;
  price: number;
  availableAt: any;
  description: string;
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
    availableAt: {
      type: [String],
      enum: ["Tại phòng khám", "Tại nhà", "Tư vấn trực tuyến"],
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;
