import mongoose from "mongoose";

interface ICustomer {
  userId: string;
  city: string;
  district: string;
  ward: string;
  detailAddress?: string;
  gender?: boolean;
}

const CustomerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    ward: {
      type: String,
    },
    detailAddress: {
      type: String,
    },
    gender: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
