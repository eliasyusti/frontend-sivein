import {
  CREATE_SALE_DETAIL,
  DELETE_SALE_DETAIL,
  GET_SALE_DETAIL,
} from "../actionsTypes/saleDetailActionType";

const initialState = {
  data: [],
  totalToPay: 0,
};

const SaleDetail = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALE_DETAIL: {
      const { details = [], totalToPay = 0 } = action.payload || {};
      return {
        ...state,
        details: Array.isArray(details) ? details : [],
        totalToPay,
      };
    }
    case CREATE_SALE_DETAIL: {
      return [action.payload];
    }
    case DELETE_SALE_DETAIL: {
      if (!Array.isArray(state)) {
        return state;
      }
      const newSaleDetail = state.filter((item) => item._id !== action.payload);
      return [...newSaleDetail];
    }
    default:
      return state;
  }
};

export default SaleDetail;
