import { combineReducers } from "redux";
import system from "./system";
import vacancy from "./vacancy";

const rootReducer = combineReducers({
  system,
  vacancy,
});

export default rootReducer;
