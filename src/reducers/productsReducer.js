import {
  CREATE_PRODUCTS,
  DELETE_PRODUCTS,
  DESACTIVE_PRODUCT,
  EDIT_PRODUCTS,
  GET_PRODUCTS,
} from "../actionsTypes/productActionType";

const initialState = [];

const Products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      if (action.payload && Array.isArray(action.payload)) {
        return [...action.payload];
      } else {
        console.error(
          "GET_PRODUCTS action payload is not a valid array:",
          action.payload,
        );
        return state;
      }
    }

    case CREATE_PRODUCTS: {
      return [...state, action.payload];
    }
    case EDIT_PRODUCTS: {
      const newProducts = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
      return [...newProducts];
    }
    case DELETE_PRODUCTS: {
      const newProduct = state.filter((item) => item._id !== action.payload);
      return [...newProduct];
    }
    case DESACTIVE_PRODUCT: {
      const productIdToDeactivate = action.payload.id;
      const updatedProducts = state.map((product) => {
        if (product.id === productIdToDeactivate) {
          return {
            ...product,
            active: false,
          };
        }
        return product;
      });

      return [...updatedProducts];
    }
    default:
      return state;
  }
};

export default Products;
