import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
