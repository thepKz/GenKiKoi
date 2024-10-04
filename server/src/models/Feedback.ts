import mongoose from "mongoose";

interface IFeedback {
  rating: number;
  comment?: string;
}

const FeedBackSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
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
