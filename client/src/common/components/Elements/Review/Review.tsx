import { ReviewsType } from "../../../types/reviews";
import { formatDate } from "../../../utils/date";
import StarRatings from "../StarRatings/StarRatings";

type ReviewProps = {
  data:ReviewsType
}
const Review = ({ data }: ReviewProps) => {
  return (
    <article className="review">
      <div className="review__header">
        <div className="review__short-summary">
          <StarRatings rating={data.rating} />
          <h3 className="review__title">{data.title}</h3>
        </div>
        <div className="review__details">
          <span className="review__details__author">{`By ${data.user.fname} ${data.user.lname}`}</span>
          <span className="review__details__date">{formatDate(data.createdAt)}</span>
        </div>
        <span className="review__recommend">Recommended : {data.isRecommended?"Yes":"No"}</span>
      </div>
      <p className="review__description">
        {data.review}
      </p>
    </article>
  );
};

export default Review;
