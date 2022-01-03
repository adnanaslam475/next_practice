import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  todos: [],
  user: null,
  cards: [],
  error: "",
  token: "",
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log("hydrate===>", action.payload);
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "AUTHENTICATE":
      return { ...state, token: action.payload };
    case "AUTH_ERROR":
      // console.log("AUTHERR_RED", action.payload);
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
