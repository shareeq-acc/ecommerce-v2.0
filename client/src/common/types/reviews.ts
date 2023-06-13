import { FilterDropdown } from "../pages/ProductPage/ReviewsContainer";

export type ReviewsSummaryType = {
  total: number;
  value: number;
};
export type ReviewsType = {
  title: string;
  review: string;
  rating: number;
  isRecommended: boolean;
  product: string; //id
  createdAt: Date;
  updatedAt?: Date;
  user: {
    fname: string,
    lname: string
  }
};
export type ProductReviewsType = {
  reviews: ReviewsType[];
  ratings: number[];
  more: boolean;
  count: number;
  avgRating: number;
  totalRatings: number;
};
export type ArgReviewsType = {
  start: number;
  sort: FilterDropdown;
  slug: string
};
