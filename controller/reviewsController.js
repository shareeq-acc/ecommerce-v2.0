import { findOrdersBasedOnProduct } from "../dbHelpers/order.js";
import {
  findProduct,
  findProductById,
  updateProductInDb,
} from "../dbHelpers/products.js";
import {
  deleteReview,
  fetchAllReviews,
  fetchProductReviews,
  fetchReviewById,
  storeReview,
  updateReview,
} from "../dbHelpers/reviews.js";
import { getUserById } from "../dbHelpers/user.js";
import ErrorHandler from "../utility/errorHandler.js";
import reviewValidation from "../utility/validation/validateReview.js";

export const getAllReviews = async (req, res) => {
  const reviews = await fetchAllReviews();
  return res.status(200).json({
    success: true,
    reviews,
  });
};

export const getAReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const isExistingReview = await fetchReviewById(reviewId);
  if (!isExistingReview) {
    return next(
      new ErrorHandler(400, "Review Does Not Exists", {
        message: "Review Does Not Exists, \n It May be Deleted",
      })
    );
  }
  return res.status(200).json({
    success: true,
    review: isExistingReview,
  });
};

export const createReview = async (req, res, next) => {
  const userId = req.user;
  const { title, review, rating, isRecommended, productId } = req.body;
  if (!userId) {
    return next(
      new ErrorHandler(403, "Auth Required", {
        auth: false,
        message: "Please Login",
      })
    );
  }
  const isExistingUser = await getUserById(userId);
  if (!isExistingUser) {
    return next(
      new ErrorHandler(403, "Auth Required", {
        auth: false,
        message: "Please Login",
      })
    );
  }

  const isExistingProduct = await findProductById(productId);
  if (!isExistingProduct) {
    return next(
      new ErrorHandler(400, "Product Not Found", {
        message: "Product Does Not Exists",
      })
    );
  }

  // User Orders that includes the product
  const ordersWithProduct = await findOrdersBasedOnProduct(
    { user: userId },
    productId
  );
  if (!ordersWithProduct || ordersWithProduct?.length === 0) {
    return next(
      new ErrorHandler(403, "Product Not Found", {
        message: "Please Purchase this Product to publish a Review",
      })
    );
  }

  const validation = reviewValidation({
    title,
    review,
    rating,
    isRecommended,
  });
  if (!validation.success) {
    return next(
      new ErrorHandler(400, "Review Validation Error", {
        formErrors: validation?.errors,
      })
    );
  }

  const newCreatedReview = await storeReview({
    title,
    review,
    rating,
    isRecommended,
    product: productId,
    user: userId,
  });

  const newReviewsArray = isExistingProduct.reviews.concat([
    newCreatedReview._id,
  ]);

  await updateProductInDb(isExistingProduct._id, {
    reviews: newReviewsArray,
  });

  return res.status(200).json({
    success: true,
    reviewId: newCreatedReview._id,
  });
};

export const removeReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const userId = req.user;
  if (!userId) {
    return next(
      new ErrorHandler(401, "Auth Required", {
        auth: false,
        message: "Please Login",
      })
    );
  }
  const isExistingUser = await getUserById(userId);
  if (!isExistingUser) {
    return next(
      new ErrorHandler(403, "Auth Required", {
        auth: false,
        message: "Please Login",
      })
    );
  }
  const isExistingReview = await fetchReviewById(reviewId);
  if (!isExistingReview) {
    return next(
      new ErrorHandler(400, "Review Does Not Exists", {
        message: "Review Does Not Exists, \n It May be Deleted",
      })
    );
  }
  if (isExistingReview?.user != userId) {
    return next(
      new ErrorHandler(403, "Unauthorized", {
        message: "You Cannot Delete This Review",
      })
    );
  }
  const reviewProduct = await findProductById(isExistingReview.product);
  const newReviewsArray = reviewProduct.reviews.filter(
    (review) => review != reviewId
  );
  await deleteReview(reviewId);
  await updateProductInDb(isExistingReview.product, {
    reviews: newReviewsArray,
  });

  res.status(200).json({
    success: true,
  });
};

export const changeReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const { title, review, rating, isRecommended } = req.body;
  const userId = req.user;
  if (!userId) {
    return next(
      new ErrorHandler(401, "Auth Required", {
        auth: false,
        message: "Please Login",
      })
    );
  }
  const isExistingUser = await getUserById(userId);
  if (!isExistingUser) {
    return next(
      new ErrorHandler(403, "Auth Required", {
        auth: false,
        message: "Please Login",
      })
    );
  }

  const validation = reviewValidation({
    title,
    review,
    rating,
    isRecommended,
  });
  if (!validation.success) {
    return next(
      new ErrorHandler(400, "Review Validation Error", {
        formErrors: validation?.errors,
      })
    );
  }

  const isExistingReview = await fetchReviewById(reviewId);
  if (!isExistingReview) {
    return next(
      new ErrorHandler(400, "Review Does Not Exists", {
        message: "Review Does Not Exists, \n It May be Deleted",
      })
    );
  }
  if (isExistingReview.user != userId) {
    return next(
      new ErrorHandler(403, "Unauthorized", {
        message: "Cannot Update Review",
      })
    );
  }

  const updatedReview = await updateReview(reviewId, {
    title,
    review,
    rating,
    isRecommended,
    updatedAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    review: updatedReview,
  });
};

export const getProductReviews = async (req, res, next) => {
  const { productSlug } = req.params;
  const start = req.query.start || 0
  const order = req.query.order || undefined
  const isExistingProduct = await findProduct("slug", productSlug);
  if (!isExistingProduct) {
    return next(
      new ErrorHandler(400, "Product Does Not Exists", {
        message: "Product Does Not Exists",
      })
    );
  }
  const { productReviews, count, more } = await fetchProductReviews(
    isExistingProduct._id,
    order,
    start
  );
  let sumRating = 0;
  let totalRatings = 0;
  let avgRating = 0;
  const ratingPerStar = [0, 0, 0, 0, 0]; // Required Format [5star, 4Star, 3Star, 2Star, 1Star]

  if (productReviews?.length) {
    productReviews.map((review) => {
      sumRating = sumRating + review.rating;
      totalRatings = totalRatings + 1;
      ratingPerStar[review.rating - 1] = ratingPerStar[review.rating - 1] + 1;
    });
    avgRating = Math.round((sumRating / totalRatings) * 10) / 10;
  }

  res.status(200).json({
    success: true,
    reviews: productReviews,
    totalRatings,
    avgRating,
    ratings: ratingPerStar.reverse(),
    more,
    count,
  });
};
