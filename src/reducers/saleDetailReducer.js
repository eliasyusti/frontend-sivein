import {
  CREATE_SALE_DETAIL,
  GET_SALE_DETAIL,
} from "../actionsTypes/saleDetailActionType";

const initialState = [];

const SaleDetail = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALE_DETAIL: {
      if (action.payload && typeof action.payload === "object") {
        return { ...state, [action.payload.id]: action.payload };
      } else {
        console.error(
          "GET_DETAIL_BY_ID action payload is not a valid object:",
          action.payload,
        );
        return state;
      }
    }

    case CREATE_SALE_DETAIL: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

export default SaleDetail;
