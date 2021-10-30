import { HYDRATE } from "next-redux-wrapper";
// import { LOGIN, REGISTER } from "./action";

const initialState = {
  todos: [],
  user: null,
  cards: [],
  error: [],
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("hydatre===>", action.payload);
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case "REGISTER":
      console.log("REGITER_reducer===>", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default reducer;
