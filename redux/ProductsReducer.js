import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  products: [],
  starred: [],
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
