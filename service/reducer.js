import towns from "../model/town";
import rank from "../model/rank";
import keywords from "../model/keywords";
import backend from "./remote/backend";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  towns,
  backend,
  rank,
  keywords
});
