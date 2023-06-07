import express from "express";
import {
  changeReview,
  createReview,
  getAllReviews,
  getAReview,
  getProductReviews,
  removeReview,
} from "../../controller/reviewsController.js";
import authentication from "../../middlewares/authMiddleware.js";
import catchAsyncErrors from "../../utility/catchAsyncErrors.js";

const router = express.Router();

router.get("/", catchAsyncErrors(getAllReviews));

router.get("/:reviewId", catchAsyncErrors(getAReview));

router.get("/product/:productSlug", catchAsyncErrors(getProductReviews));

router.post("/", authentication, catchAsyncErrors(createReview));

router.delete("/:reviewId", authentication, catchAsyncErrors(removeReview));

router.put("/:reviewId", authentication, catchAsyncErrors(changeReview));

export default router;
