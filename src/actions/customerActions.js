import {
  CREATE_CUSTOMERS,
  DELETE_CUSTOMERS,
  EDIT_CUSTOMERS,
  GET_CUSTOMERS,
} from "../actionsTypes/customerActionType";
import {
  createCustomerService,
  deleteCustomerService,
  editCustomersService,
  getCustomersService,
} from "../services/customerService";

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

export const getListCustomers = () => {
  return async (dispatch) => {
    const Listcustomers = await getCustomersService(getData);
    dispatch(dispatchAction(GET_CUSTOMERS, Listcustomers));
  };
};

export const postCustomers = (body, onPending) => {
  return async (dispatch) => {
    const response = await createCustomerService(body, getData, onPending);
    dispatch(dispatchAction(CREATE_CUSTOMERS, response));
    return response;
  };
};

export const editCustomers = (body, onPending) => {
  return async (dispatch) => {
    const { data } = await editCustomersService(body, getData, onPending);
    dispatch(dispatchAction(EDIT_CUSTOMERS, body));
    return data;
  };
};

export const deleteCustomers = (id) => {
  return async (dispatch) => {
    await deleteCustomerService(id, getMessage);
    dispatch(dispatchAction(DELETE_CUSTOMERS, id));
  };
};
