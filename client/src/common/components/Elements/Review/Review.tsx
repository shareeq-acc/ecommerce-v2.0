import StarRatings from "../StarRatings/StarRatings";

const Review = () => {
  return (
    <article className="review">
      <div className="review__header">
        <div className="review__short-summary">
          <StarRatings rating={4} />
          <h3 className="review__title">Works Great!</h3>
        </div>
        <div className="review__details">
          <span className="review__details__author">By Reviewer Name</span>
          <span className="review__details__date">10 October 2022</span>
        </div>
        <span className="review__recommend">Recommended : Yes</span>
      </div>
      <p className="review__description">
        This is an awesome product. I am amazed by the quality. However I think
        it's a bit overpriced and there are better options available.
      </p>
    </article>
  );
};

export default Review;
