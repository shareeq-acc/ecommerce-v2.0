import ProgressBar from "../../components/Elements/ProgressBar/ProgressBar";
import StarRatings from "../../components/Elements/StarRatings/StarRatings";

type ProductSummaryProps = {
  totalRatings: number;
  avgRatings: number;
  ratings:number[]
};
const ReviewsSummary = ({ totalRatings, avgRatings, ratings}: ProductSummaryProps) => {
  return (
    <div className="reviews-summary--wrap">
      <div className="review__overview">
        <div className="rating__score">
          <span className="rating__score__scored">{avgRatings}</span>
          <span className="rating__review-max">/5</span>
        </div>
        <div className="rating__stars">
          <StarRatings rating={avgRatings} />
        </div>
        <div className="reviews__total-ratings">{`${totalRatings} ${
          totalRatings > 1 ? "Ratings" : "Rating"
        }`}</div>
      </div>
      <div className="rating__details">
        {ratings.map((star, index) => {
          return (
            <div
              key={index}
              className="rating__details__individual-review-data"
            >
              <StarRatings rating={5 - index} />
              <ProgressBar total={totalRatings} current={star} />
              {`(${star})`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsSummary;
