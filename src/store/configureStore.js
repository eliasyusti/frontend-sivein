import { configureStore } from "@reduxjs/toolkit";
import Products from "../reducers/productsReducer";

const store = configureStore({
  reducer: {
    Products,
  },
});

export default store;
