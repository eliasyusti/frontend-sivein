import { GET_CATEGORY } from "../actionsTypes/categoryActionType";
import { getCategoryService } from "../services/categoryService";

const getData = ({ data }) => {
  return data;
};

const dispatchAction = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const getListCategories = () => {
  return async (dispatch) => {
    const ListCategories = await getCategoryService(getData);
    dispatch(dispatchAction(GET_CATEGORY, ListCategories));
  };
};
