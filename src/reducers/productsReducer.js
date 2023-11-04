import { GET_PRODUCTS } from "../actionsTypes/productActionType";

const initialState = [];

const Products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return [action.payload];
    }

    default:
      return state;
  }
};

export default Products;
