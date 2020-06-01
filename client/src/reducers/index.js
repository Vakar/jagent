import { combineReducers } from "redux";
import job from "./job";
import jobs from "./jobs";
import system from "./system";

const rootReducer = combineReducers({
  system,
  jobs,
  job,
});

export default rootReducer;
