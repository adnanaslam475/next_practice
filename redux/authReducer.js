import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  user: null,
  cards: [],
  error: "",
  token: "",
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log("obje...ct1", state);
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "REGISTER":
      // console.log("obje...ct", state);
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
