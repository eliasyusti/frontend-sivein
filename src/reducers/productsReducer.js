import {
  CREATE_PRODUCTS,
  GET_PRODUCTS,
} from "../actionsTypes/productActionType";

const initialState = [];

const Products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return [...action.payload];
    }
    case CREATE_PRODUCTS: {
      return [...state, action.payload];
    }

    default:
      return state;
  }
};

export default Products;
