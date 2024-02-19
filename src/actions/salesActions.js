import {
  CREATE_SALES,
  DELETE_SALES,
  EDIT_SALES,
  GET_SALES,
  GET_SALE_BY_ID,
} from "../actionsTypes/salesActionsType";
import {
  createSaleService,
  deleteSaleService,
  editSaleService,
  getSaleByIdService,
  getSalesService,
} from "../services/saleService";

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

export const getListSales = () => {
  return async (dispatch) => {
    const ListSales = await getSalesService(getData);
    dispatch(dispatchAction(GET_SALES, ListSales));
  };
};

export const getSaleById = (id) => {
  return async (dispatch) => {
    try {
      const response = await getSaleByIdService(id);
      if (response && response.data) {
        const { data } = response.data || [];

        dispatch(dispatchAction(GET_SALE_BY_ID, data));
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

export const postSale = (body, onPending) => {
  return async (dispatch) => {
    const response = await createSaleService(body, getData, onPending);
    dispatch(dispatchAction(CREATE_SALES, response));
    return response;
  };
};

export const editSale = (body, onPending) => {
  return async (dispatch) => {
    const { data } = await editSaleService(body, getData, onPending);
    dispatch(dispatchAction(EDIT_SALES, body));
    return data;
  };
};

export const deleteSale = (id) => {
  return async (dispatch) => {
    await deleteSaleService(id, getMessage);
    dispatch(dispatchAction(DELETE_SALES, id));
  };
};
