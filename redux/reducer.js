import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  todos: [],
  users: [],
  cards: [],
  error: [],
};

// create your reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case AUTHENTICATE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default reducer;
