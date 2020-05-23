import {
  ADD_VACANCY,
  DELETE_VACANCY,
  EDIT_VACANCY,
  ERROR,
  GET_VACANCIES,
} from "../actions/types";

import produce from "immer";

const initialState = {
  selectedVacancy: null,
  vacancies: [],
  error: null,
};

export default function vacancies(baseState = initialState, action) {
  switch (action.type) {
    case ADD_VACANCY:
      return produce(baseState, (draftState) => {
        draftState.vacancies.push(action.vacancy);
      });
    case DELETE_VACANCY:
      return produce(baseState, (draftState) => {
        if (draftState.selectedVacancy) {
          draftState.selectedVacancy =
            draftState.selectedVacancy.id === action.id
              ? undefined
              : draftState.selectedVacancy;
        }
        draftState.vacancies = draftState.vacancies.filter(
          (e) => e.id !== action.id
        );
      });
    case EDIT_VACANCY:
      return produce(baseState, (draftState) => {
        draftState.selectedVacancy =
          draftState.selectedVacancy.id === action.vacancy.id
            ? action.vacancy
            : draftState.selectedVacancy;
        draftState.vacancies = draftState.vacancies.map((e) =>
          e.id === action.vacancy.id ? action.vacancy : e
        );
      });
    case GET_VACANCIES:
      return produce(baseState, (draftState) => {
        draftState.vacancies = action.vacancies;
      });
    case ERROR:
      return produce(baseState, (draftState) => {
        draftState.error = action.error;
      });
    default:
      return baseState;
  }
}
