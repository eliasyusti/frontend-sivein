import { configureStore } from "@reduxjs/toolkit";
import Products from "../reducers/productsReducer";
import Category from "../reducers/categoryReducer";

const store = configureStore({
  reducer: {
    Products,
    Category,
  },
});

export default store;
