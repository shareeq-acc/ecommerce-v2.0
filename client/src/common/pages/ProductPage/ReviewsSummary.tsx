import ProgressBar from "../../components/Elements/ProgressBar/ProgressBar";
import StarRatings from "../../components/Elements/StarRatings/StarRatings";
import { ProductRatingsType } from "../../types/productTypes";
const data = [10, 6, 2, 1, 2];

type ProductSummaryProps = {
  totalRatings: number;
  avgRatings: number;
};
const ReviewsSummary = ({ totalRatings, avgRatings }: ProductSummaryProps) => {
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
        {[...Array(5)].map((star, index) => {
          return (
            <div
              key={index}
              className="rating__details__individual-review-data"
            >
              <StarRatings rating={5 - index} />
              <ProgressBar total={21} current={data[index]} />
              {`(${data[index]})`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsSummary;
