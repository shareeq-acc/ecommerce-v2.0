
import { ServerResponse } from "../../common/types/index";
import { ArgReviewsType, ProductReviewsType } from "../../common/types/reviews";
import { emptySplitApi } from ".";

export const reviewsApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<ServerResponse & ProductReviewsType, ArgReviewsType>({
      query: ({ start, sort, slug }) => `/review/product/${slug}?start=${start}?order=${sort}`,
    }),
  }),
});

export const { useGetProductReviewsQuery } = reviewsApi;
