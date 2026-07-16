import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import productReducer from "../redux/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
