import mongoose from "mongoose";

interface IFeedback {
  appointmentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
}

const FeedBackSchema = new mongoose.Schema<IFeedback>(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
