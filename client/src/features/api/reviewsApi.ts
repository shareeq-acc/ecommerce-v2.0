// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerResponse } from "../../common/types/index";
import { ArgReviewsType, ProductReviewsType } from "../../common/types/reviews";

const url = "http://localhost:8000/api/reviews";



// Define a service using a base URL and expected endpoints
export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getProductReviews: builder.query<ServerResponse & ProductReviewsType, ArgReviewsType>({
      query: ({start, sort}) => `/product/?start=${start}?sort=${sort}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductReviewsQuery } = reviewsApi;
