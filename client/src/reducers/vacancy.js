import {
  ADD_SAVED_VACANCY,
  CLEAN_FOUND_VACANCIES,
  DELETE_SAVED_VACANCY,
  SET_FOUND_VACANCIES,
  SET_SAVED_VACANCIES,
} from "../actions/types";

import produce from "immer";

const initialState = {
  foundVacancies: [],
  savedVacancies: [],
};

export default function vacancies(baseState = initialState, action) {
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
    default:
      return baseState;
  }
}
