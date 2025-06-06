import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice"
import productSlice from "./reducers/productSlice"
import userSlice from "./reducers/userSlice"

export const store = configureStore({
  reducer: {
   cart : cartSlice,
   product : productSlice,
   user : userSlice
  },
});
