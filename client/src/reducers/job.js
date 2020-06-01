import {
  ADD_SAVED_VACANCY,
  CLEAN_FOUND_VACANCIES,
  DELETE_SAVED_VACANCY,
  REMOVE_SEARCH_PARAMS,
  SET_FOUND_VACANCIES,
  SET_SAVED_VACANCIES,
  SET_SEARCH_PARAMS,
} from "../actions/types";

import produce from "immer";

const initialState = {
  foundVacancies: [],
  savedVacancies: [],
  searchParams: undefined,
};

export default function job(baseState = initialState, action) {
  switch (action.type) {
    case SET_FOUND_VACANCIES:
      return produce(baseState, (draftState) => {
        draftState.foundVacancies = action.vacancies;
      });
    case CLEAN_FOUND_VACANCIES:
      return produce(baseState, (draftState) => {
        draftState.foundVacancies = [];
      });
    case SET_SAVED_VACANCIES:
      return produce(baseState, (draftState) => {
        draftState.savedVacancies = action.vacancies;
      });
    case ADD_SAVED_VACANCY:
      return produce(baseState, (draftState) => {
        draftState.savedVacancies.push(action.vacancy);
      });
    case DELETE_SAVED_VACANCY:
      return produce(baseState, (draftState) => {
        const id = action.vacancy._id;
        draftState.savedVacancies = draftState.savedVacancies.filter((e) => {
          e._id !== id;
        });
      });
    case SET_SEARCH_PARAMS:
      return produce(baseState, (draftState) => {
        draftState.searchParams = action.searchParams;
      });
    case REMOVE_SEARCH_PARAMS:
      return produce(baseState, (draftState) => {
        draftState.searchParams = undefined;
      });
    default:
      return baseState;
  }
}
