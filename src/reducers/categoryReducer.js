import { GET_CATEGORY } from "../actionsTypes/categoryActionType";

const initialState = [];

const Category = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY: {
      return [...action.payload];
    }
    default:
      return state;
  }
};

export default Category;
