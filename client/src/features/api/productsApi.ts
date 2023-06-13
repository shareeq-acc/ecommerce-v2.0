import {
  ProductContainerType,
  ProductType,
} from "../../common/types/productTypes";
import { ServerResponse } from "../../common/types/index";
import { emptySplitApi } from ".";


type GetProductsType = {
  products: ProductContainerType[];
};

type SingleProductType = {
  product: ProductType;
};

export const productApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeProducts: builder.query<GetProductsType & ServerResponse, string>({
      query: () => `product/home`,
    }),
    getSingleProduct: builder.query<SingleProductType & ServerResponse, String>(
      {
        query: (slug) => `product/${slug}`,
      }
    ),
  }),
});

export const { useGetHomeProductsQuery, useGetSingleProductQuery } = productApi;
