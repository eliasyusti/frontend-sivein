import {
  CREATE_SALE_DETAIL,
  DELETE_SALE_DETAIL,
  GET_SALE_DETAIL,
} from "../actionsTypes/saleDetailActionType";
import {
  getSaleDetailsService,
  deleteSaleDetailService,
  createSaleDetailService,
} from "../services/saleDetailsService";

const getData = ({ data }) => {
  return data;
};
const getMessage = (message) => {
  return message;
};
const dispatchAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const getSaleDetailById = (salesId) => {
  return async (dispatch) => {
    try {
      const response = await getSaleDetailsService(salesId);
      if (response && response.data) {
        const { data } = response || [];

        dispatch(dispatchAction(GET_SALE_DETAIL, data));
        return response;
      } else {
        console.error("Response is undefined.");
      }
    } catch (error) {
      console.error("Error fetching sale details:", error);
      throw error;
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

export const deleteSaleDetail = (id) => {
  return async (dispatch) => {
    await deleteSaleDetailService(id, getMessage);
    dispatch(dispatchAction(DELETE_SALE_DETAIL, id));
  };
};
