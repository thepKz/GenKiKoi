import mongoose from "mongoose";

interface ICustomer {
  userId: mongoose.Types.ObjectId;
  city?: string;
  district?: string;
  ward?: string;
  detailAddress?: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
