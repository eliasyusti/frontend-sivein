import { GET_PRODUCTS } from "../actionsTypes/productActionType";
import { getProductsService } from "../services/productService";

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
