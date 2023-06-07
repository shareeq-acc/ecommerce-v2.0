const reviewValidation = ({ title, review, rating, isRecommended }) => {
  if (!title) {
    return {
      success: false,
      formErrors: {
        title: "Please Enter Title",
      },
    };
  }
  if (title.trim().length < 3) {
    return {
      success: false,
      formErrors: {
        title: "Minimum 3 Characters (excluding any trailing spaces)",
      },
    };
  }
  if (title.trim().length > 100) {
    return {
      success: false,
      formErrors: {
        title: "Maximum 100 Characters",
      },
    };
  }
  if (!review) {
    return {
      success: false,
      formErrors: {
        review: "Please Enter Review Description",
      },
    };
  }
  if (review.trim().length < 20) {
    return {
      success: false,
      formErrors: {
        review: "Minimum 20 Characters (excluding any trailing spaces)",
      },
    };
  }
  if (review.trim().length > 1000) {
    return {
      success: false,
      formErrors: {
        review: "Maximum 1000 Characters",
      },
    };
  }
  if (!rating) {
    return {
      success: false,
      formErrors: {
        rating: "Please Give a Rating",
      },
    };
  }
  if (rating < 0 || rating > 5) {
    return {
      success: false,
      formErrors: {
        rating: "Please Give a Rating",
      },
    };
  }
  if (!isRecommended) {
    return {
      success: false,
      formErrors: {
        isRecommended: "Please Give your Recommendation",
      },
    };
  }
  return {
    success: true,
  };
};

export default reviewValidation;
