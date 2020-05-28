import { REMOVE_SYSTEM_ALERT, SET_SYSTEM_ALERT } from "../actions/types";

import produce from "immer";

const initialState = {
  alert: undefined,
};

export default function jobs(baseState = initialState, action) {
  switch (action.type) {
    case SET_SYSTEM_ALERT:
      return produce(baseState, (draftState) => {
        draftState.alert = action.alert;
      });
    case REMOVE_SYSTEM_ALERT:
      return produce(baseState, (draftState) => {
        draftState.alert = undefined;
      });
    default:
      return baseState;
  }
}
