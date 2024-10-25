import mongoose from "mongoose";
export interface IFeedback {
  customerId: mongoose.Types.ObjectId;
  appointmentId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  feedbackDate: Date;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}

const FeedBackSchema = new mongoose.Schema<IFeedback>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    feedbackDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model<IFeedback>("Feedback", FeedBackSchema);
export default Feedback;
