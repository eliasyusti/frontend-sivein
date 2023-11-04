import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Products from "./productsReducer";

const rootReducer = combineReducers({
  routing: routerReducer,
  products: Products,
});

export default rootReducer;
