import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    default: 5,
  },
  review: {
    type: String,
    trim: true,
  },
  isRecommended: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: "Approved",
    enum: ["Waiting Approval", "Rejected", "Approved"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
