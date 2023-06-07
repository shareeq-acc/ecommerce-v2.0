import { Link } from "react-router-dom";
import { useState } from "react";
import image from "../../../assets/images/razer-viper-mini.jpg";
import Button from "../../components/Elements/Button/Button";
import StarRatings from "../../components/Elements/StarRatings/StarRatings";
import { reviewdOrders, notReviewdOrders } from "./data";

export type ProductNotReviewedType = {
  title: string;
  quantity: number;
  productSlug: string;
};

export type ProductsReviewedType = {
  rating: number;
  description: string;
  // status: "Waiting Approval" | "Rejected" | "Approved";
  status: string;
} & ProductNotReviewedType;

const ProductsReviewed = ({
  title,
  rating,
  status,
  description,
  quantity,
}: ProductsReviewedType) => {
  // const image = ""
  return (
    <div className="order-review__card">
      <div className="order-review__card__img-wrap">
        <img src={image} alt="review-img" className="review-card__img" />
      </div>
      <div className="review-card__info">
        <h3 className="review-card__title">{title}</h3>
        <p className="review-card__description">{description}</p>
        <StarRatings rating={rating} />
        <span>Quantity : {quantity}</span>
        <span>Status : {status}</span>
      </div>
    </div>
  );
};
const ProductsNotReviewed = ({
  title,
  quantity,
  productSlug,
}: ProductNotReviewedType) => {
  return (
    <div className="order-review__card">
      <div className="order-review__card__img-wrap">
        <img src={image} alt="review-img" className="review-card__img" />
      </div>
      <div className="review-card__info">
        <h3 className="review-card__title">{title}</h3>
        <span>Quantity : {quantity}</span>
        <Link
          to={`/product/review/${productSlug}`}
          className="review-card__link"
        >
          Review
        </Link>
      </div>
    </div>
  );
};

type activeLinkType = 1 | 2;

const ReviewedOrders = () => {
  const [activeLink, setActiveLink] = useState<activeLinkType>(1);
  return (
    <div className="order-reviews-wrap">
      <div className="review-order__tabs-wrap">
        <Button className={`review-orders__tabs ${activeLink === 1 ? "review-orders__active-tab" : ""}`} onClick={() => setActiveLink(1)}>Reviewed(5)</Button>
        <Button className={`review-orders__tabs ${activeLink === 2 ? "review-orders__active-tab" : ""}`} onClick={() => setActiveLink(2)}>Not Reviewed(3)</Button>
      </div>

      <div className="order-reviews__container">
        {reviewdOrders.map((item, index) => (
          <ProductsReviewed
            key={index}
            title={item.title}
            rating={item.rating}
            status={item.status}
            description={item.description}
            quantity={item.quantity}
            productSlug={item.productSlug}
          />
        ))}
        {/* {reviewdOrders.map((item, index) => (
          <ProductsNotReviewed
            key={index}
            title={item.title}
            quantity={item.quantity}
            productSlug={item.productSlug}
          />
        ))} */}
      </div>
    </div>
  );
};

export default ReviewedOrders;
