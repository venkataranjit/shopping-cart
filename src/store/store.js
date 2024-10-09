import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import fetchSlice from "./fetchSlice";

const store = configureStore({
  reducer: {
    cartDetails: cartSlice,
    fetchData: fetchSlice,
  },
});

export default store;
