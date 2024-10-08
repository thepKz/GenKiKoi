import mongoose from "mongoose";

interface ICustomer {
  userId: mongoose.Types.ObjectId;
  city: string;
  district: string;
  ward: string;
  detailAddress: string;
  gender?: boolean;
}

const CustomerSchema = new mongoose.Schema<ICustomer>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    detailAddress: {
      type: String,
      required: true,
    },
    gender: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
