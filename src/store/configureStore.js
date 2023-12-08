import { configureStore } from "@reduxjs/toolkit";
import Products from "../reducers/productsReducer";
import Category from "../reducers/categoryReducer";
import Customers from "../reducers/customerReducer";

const store = configureStore({
  reducer: {
    Products,
    Category,
    Customers,
  },
});

export default store;
