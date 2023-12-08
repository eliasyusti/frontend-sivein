import { configureStore } from "@reduxjs/toolkit";
import Products from "../reducers/productsReducer";
import Category from "../reducers/categoryReducer";
import Customers from "../reducers/customerReducer";
import Sales from "../reducers/salesReducer";

const store = configureStore({
  reducer: {
    Products,
    Category,
    Customers,
    Sales,
  },
});

export default store;
