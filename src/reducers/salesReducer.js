import {
  CREATE_SALES,
  DELETE_SALES,
  EDIT_SALES,
  GET_SALES,
  GET_SALE_BY_ID,
} from "../actionsTypes/salesActionsType";

const initialState = [];

const Sales = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES: {
      if (action.payload && Array.isArray(action.payload)) {
        return [...action.payload];
      } else {
        console.error(
          "GET_SALES action payload is not a valid array:",
          action.payload,
        );
        return state;
      }
    }

    case GET_SALE_BY_ID: {
      if (action.payload && typeof action.payload === "object") {
        return [action.payload]; // Devuelve un array con la venta encontrada
      } else {
        console.error(
          "GET_SALE_BY_ID action payload is not a valid object:",
          action.payload,
        );
        return state;
      }
    }

    case CREATE_SALES: {
      return [...state, action.payload];
    }
    case EDIT_SALES: {
      const newSale = state.map((item) => {
        if (item.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
      return [...newSale];
    }
    case DELETE_SALES: {
      const newSale = state.filter((item) => item._id !== action.payload);
      return [...newSale];
    }
    default:
      return state;
  }
};

export default Sales;
