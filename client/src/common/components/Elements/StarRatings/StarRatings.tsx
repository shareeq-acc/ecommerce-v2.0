import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

type StarRatingProps = {
  rating: number; // Initial Rating to be displayed
  className?: string;
  setRating?: (rating: number) => void; // For Setting Ratings
};

type RenderStarProps = {
  index: number;
};

const StarRatings = ({ rating, className, setRating }: StarRatingProps) => {
  const [ratingStars, setRatingStars] = useState<number>(rating);

  const handleClick = (index: number) => {
    if (setRating) {
      // Allowed to Set Rating
      setRatingStars(index + 1);
      setRating(index + 1);
    }
  };
  
  useEffect(() => {
    setRatingStars(rating);
  }, []);

  const RenderStar = ({ index }: RenderStarProps) => {
    if (ratingStars >= index + 1) {
      return (
        <FontAwesomeIcon
          icon={faStar}
          className={"star-icon fill-star"}
          key={index}
          onClick={() => handleClick(index)}
        />
      );
    }
    if (ratingStars > index && ratingStars < index + 1) {
      // Rating between the Last and Previous Value
      return (
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          className={"star-icon fill-star"}
          key={index}
          onClick={() => handleClick(index)}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faStar}
        className={"star-icon empty-star"}
        key={index}
        onClick={() => handleClick(index)}
      />
    );
  };
  return (
    <div className={`ratings-container ${className ? className : ""}`}>
      {[...Array(5)].map((star, index) => {
        return <RenderStar index={index} key={index + 5} />;
      })}
    </div>
  );
};

export default StarRatings;
