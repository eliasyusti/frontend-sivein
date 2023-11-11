import {
  CREATE_PRODUCTS,
  EDIT_PRODUCTS,
  GET_PRODUCTS,
} from "../actionsTypes/productActionType";
import {
  createProductsService,
  getProductsService,
  editProductsService,
} from "../services/productService";

const getData = ({ data }) => {
  return data;
};

const dispatchAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const getListProducts = () => {
  return async (dispatch) => {
    const ListProducts = await getProductsService(getData);
    dispatch(dispatchAction(GET_PRODUCTS, ListProducts));
  };
};

export const postProducts = (body, onPending) => {
  return async (dispatch) => {
    const response = await createProductsService(body, getData, onPending);
    dispatch(dispatchAction(CREATE_PRODUCTS, response));
    return response;
  };
};

export const editProducts = (body, onPending) => {
  return async (dispatch) => {
    const { data } = await editProductsService(body, getData, onPending);
    console.log(data, "data");
    dispatch(dispatchAction(EDIT_PRODUCTS, body));
  };
};
