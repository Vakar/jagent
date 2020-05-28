import { combineReducers } from "redux";
import job from "./job";
import system from "./system";

const rootReducer = combineReducers({
  system,
  job,
});

export default rootReducer;
