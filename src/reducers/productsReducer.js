import {
  CREATE_PRODUCTS,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
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
    case EDIT_PRODUCTS: {
      const newPartnerCheffs = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
      return [...newPartnerCheffs];
    }
    case DELETE_PRODUCTS: {
      const newProduct = state.filter((item) => item._id !== action.payload);
      return [...newProduct];
    }
    default:
      return state;
  }
};

export default Products;
