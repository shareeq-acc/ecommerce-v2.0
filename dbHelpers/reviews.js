import mongoose from "mongoose";
import Review from "../models/reviewSchema.js";

export const fetchAllReviews = async () => {
  return await Review.find({});
};

export const fetchReviewById = async (reviewId) => {
  console.log(reviewId);
  if (!mongoose.Types.ObjectId.isValid("5c0a7922c9d89830f4911426")) {
    return false;
  }
  return await Review.findById(reviewId);
};

export const fetchProductReviews = async (productId, order, start) => {
  let more = true;
  const limit = 10;
  const count = await Review.estimatedDocumentCount();
  if (start + limit >= count) {
    more = false;
  }
  if (order === "high-low" || order === "low-high" || !order) {
    const reviews = await Review.find({ product: productId })
      .where("status")
      .equals("Approved")
      .sort({ rating: order === "low-high" ? 1 : -1 })
      .skip(start)
      .limit(limit);
    return {
      productReviews:reviews,
      more,
      count,
    };
  } else {
    const reviews = Review.find({ product: productId })
      .where("status")
      .equals("Approved")
      .sort({ createdAt: -1 })
      .skip(start)
      .limit(limit);

    return {
      productReviews:reviews,
      more,
      count,
    };
  }
};

export const storeReview = async (data) => {
  const newReview = new Review(data);
  await newReview.save();
  return newReview;
};

export const deleteReview = async (reviewId) => {
  await Review.findByIdAndDelete(reviewId);
};

export const updateReview = async (reviewId, review) => {
  return await Review.findByIdAndUpdate(reviewId, review);
};
