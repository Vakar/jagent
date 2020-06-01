import { combineReducers } from "redux";
import jobs from "./jobs";
import system from "./system";

const rootReducer = combineReducers({
  system,
  jobs,
});

export default rootReducer;
