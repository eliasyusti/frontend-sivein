import {
  CREATE_CUSTOMERS,
  DELETE_CUSTOMERS,
  EDIT_CUSTOMERS,
  GET_CUSTOMERS,
} from "../actionsTypes/customerActionType";

const initialState = [];

const Customers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS: {
      if (action.payload && Array.isArray(action.payload)) {
        return [...action.payload];
      } else {
        console.error(
          "GET_CUSTOMERS action payload is not a valid array:",
          action.payload,
        );
        return state;
      }
    }

    case CREATE_CUSTOMERS: {
      return [...state, action.payload];
    }
    case EDIT_CUSTOMERS: {
      const newCustomer = state.map((item) => {
        if (item.id) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
      return [...newCustomer];
    }
    case DELETE_CUSTOMERS: {
      const newCustomer = state.filter((item) => item._id !== action.payload);
      return [...newCustomer];
    }
    default:
      return state;
  }
};

export default Customers;
