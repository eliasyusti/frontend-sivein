import { configureStore } from "@reduxjs/toolkit";
import Products from "../reducers/productsReducer";

// reducer.js
// const initialState = {
//   number: 0, // Inicializamos el número en 0
// };

// Definimos el reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return {
//         ...state,
//         number: state.number + 1,
//       };
//     case "DECREMENT":
//       return {
//         ...state,
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// };

const store = configureStore({
  reducer: {
    Products, // Agrega tu reducer al objeto de reducers
  },
});

export default store;
