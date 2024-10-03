import mongoose from "mongoose";

interface ICustomer {
  userId: string;
  address?: string;
  gender?: boolean;
}

const CustomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
  },
  gender: {
    type: Boolean,
  },
});

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;
