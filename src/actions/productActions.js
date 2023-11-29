import {
  CREATE_PRODUCTS,
  DELETE_PRODUCTS,
  DESACTIVE_PRODUCT,
  EDIT_PRODUCTS,
  GET_PRODUCTS,
} from "../actionsTypes/productActionType";
import {
  createProductsService,
  getProductsService,
  editProductsService,
  deleteProductService,
  editProductActiveService,
} from "../services/productService";

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
    dispatch(dispatchAction(EDIT_PRODUCTS, body));
    return data;
  };
};

export const deleteProducts = (id) => {
  return async (dispatch) => {
    await deleteProductService(id, getMessage);
    dispatch(dispatchAction(DELETE_PRODUCTS, id));
  };
};

export const desactivateProduct = (productId, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await editProductActiveService(
        productId,
        false,
        onSuccess,
      );
      dispatch(
        dispatchAction(DESACTIVE_PRODUCT, { id: productId, active: false }),
      );
      return response;
    } catch (error) {
      console.error(`Error in desactivate product: ${error}`);
      throw error;
    }
  };
};
