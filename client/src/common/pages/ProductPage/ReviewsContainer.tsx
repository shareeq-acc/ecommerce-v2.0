import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ReviewsSummary from "./ReviewsSummary";
import Review from "../../components/Elements/Review/Review";
import { ProductRatingsType } from "../../types/productTypes";
import { useGetProductReviewsQuery } from "../../../features/api/reviewsApi";
import { useParams } from "react-router-dom";

export type FilterDropdown = "recent" | "high-low" | "low-high";
type ReviewsContainerTypes = {
  ratings: ProductRatingsType;
  slug: string;
};
const ReviewsContainer = () => {
  const [filterType, setFilterType] = useState<FilterDropdown>("recent");
  const [showDropdown, setShowDropdown] = useState(false);
  const [start, setStart] = useState<number>(0);
  let { id } = useParams() || "";
  if (id == undefined) {
    id = "";
  }
  const { data, error, isLoading } = useGetProductReviewsQuery({
    slug: id,
    start,
    sort: filterType,
  });
  console.log(data)

  const changeFilterValue = (value: FilterDropdown) => {
    setFilterType(value);
  };
  useEffect(() => {
    setStart(0);
  }, [filterType]);

  return (
    <div className="reviews-container section--margin">
      {data?.success && (
        <ReviewsSummary
          totalRatings={data?.totalRatings}
          avgRatings={data.avgRating}
        />
      )}
      <div className="reviews__filter-wrap">
        <span className="reviews__filter__heading-text">Product Reviews</span>
        <div
          className="reviews__sort-wrap"
          onClick={() => setShowDropdown(showDropdown ? false : true)}
        >
          {!showDropdown && (
            <FontAwesomeIcon icon={faCaretDown} className={"dropdown-icon"} />
          )}
          {showDropdown && (
            <FontAwesomeIcon icon={faCaretUp} className={"dropdown-icon"} />
          )}
          <span className="sort">Sort: {filterType}</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                <li
                  className="dropdown-item"
                  onClick={() => changeFilterValue("recent")}
                >
                  Recent
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => changeFilterValue("high-low")}
                >
                  High-Low
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => changeFilterValue("low-high")}
                >
                  Low-High
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="reviews__wrap">
        {data?.reviews.map((review, index) => (
          <Review key={index} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsContainer;
