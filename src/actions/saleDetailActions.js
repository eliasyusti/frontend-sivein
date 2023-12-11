import {
  CREATE_SALE_DETAIL,
  GET_SALE_DETAIL,
} from "../actionsTypes/saleDetailActionType";
import {
  createSaleDetailService,
  getSaleDetailsService,
} from "../services/saleDetailsService";

const getData = ({ data }) => {
  return data;
};

const dispatchAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const getSaleDetailById = (saleId) => {
  return async (dispatch) => {
    try {
      const saleDetails = await getSaleDetailsService(saleId);
      dispatch(dispatchAction(GET_SALE_DETAIL, saleDetails));
    } catch (error) {
      console.error(`Error getting sale details by ID ${saleId}: ${error}`);
    }
  };
};

export const postSaleDetail = (body, onPending) => {
  return async (dispatch) => {
    const response = await createSaleDetailService(body, getData, onPending);
    dispatch(dispatchAction(CREATE_SALE_DETAIL, response));
    return response;
  };
};
