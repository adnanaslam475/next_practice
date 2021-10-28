import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer
});

const bindMiddleware = (middleware) => {
  return applyMiddleware(...middleware);
};

const initStore = () => {
  return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
