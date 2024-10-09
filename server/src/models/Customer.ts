import mongoose from "mongoose";

interface ICustomer {
  userId: mongoose.Types.ObjectId;
  city?: string;
  district?: string;
  ward?: string;
  detailAddress?: string;
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
  },
  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
