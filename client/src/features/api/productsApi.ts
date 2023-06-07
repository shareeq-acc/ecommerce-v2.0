// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductContainerType,
  ProductType,
} from "../../common/types/productTypes";
import { ServerResponse } from "../../common/types/index";

const url = "http://localhost:8000/api/product";

type GetProductsType = {
  products: ProductContainerType[];
};

type SingleProductType = {
  product: ProductType;
};

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getHomeProducts: builder.query<GetProductsType & ServerResponse, string>({
      query: () => `/home`,
    }),
    getSingleProduct: builder.query<SingleProductType & ServerResponse, String>(
      {
        query: (slug) => `/${slug}`,
      }
    ),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetHomeProductsQuery, useGetSingleProductQuery } = productApi;
