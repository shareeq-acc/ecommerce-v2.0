import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductCard, ProductType } from "../../common/types/productTypes";

export interface ProductsState {
  products: ProductCard[] ;
  currentProduct: ProductType | null;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    decrement: (state) => {},
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = productSlice.actions;

export default productSlice.reducer;
