import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  products: [],
  starred: [],
  isloading: false,
  page: 0,
  prevY: 0,
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log("HYDRATE_PRO", state);
      return { ...state };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
