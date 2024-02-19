import { configureStore } from "@reduxjs/toolkit";
import Products from "../reducers/productsReducer";
import Category from "../reducers/categoryReducer";
import Customers from "../reducers/customerReducer";
import Sales from "../reducers/salesReducer";
import SaleDetail from "../reducers/saleDetailReducer";

const store = configureStore({
  reducer: {
    Products,
    Category,
    Customers,
    Sales,
    SaleDetail,
  },
});

export default store;
