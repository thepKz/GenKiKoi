import mongoose from "mongoose";
import { IAppointment } from "./Appointment";

interface IFeedback {
  userId: mongoose.Types.ObjectId;
  feedbackDate: Date;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}

const FeedBackSchema = new mongoose.Schema<IFeedback>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
