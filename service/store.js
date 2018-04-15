import { createStore, applyMiddleware } from "redux";

import { reducer } from "./reducer";

const backendSrvMiddleware = store => next => action => {
  if (typeof action === "function") {
    return action(store);
  }
  return next(action);
};
export default createStore(reducer, applyMiddleware(backendSrvMiddleware));