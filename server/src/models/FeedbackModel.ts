import mongoose from "mongoose";

interface IFeedback {
  rating: number;
  comment?: string;
}

const FeedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

const Feedback = mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export default Feedback;
