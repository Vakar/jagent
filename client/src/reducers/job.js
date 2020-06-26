import {
  ADD_SAVED_VACANCY,
  CLEAN_FOUND_VACANCIES,
  CLEAN_SAVED_VACANCIES,
  DELETE_SAVED_VACANCY,
  REMOVE_SEARCH_PARAMS,
  SELECT_JOB,
  SET_CITIES,
  SET_FOUND_VACANCIES,
  SET_SAVED_VACANCIES,
  SET_SEARCH_PARAMS,
  SET_SELECTED_CITY,
} from "../actions/types";

import produce from "immer";

const initialState = {
  selectedJob: undefined,
  foundVacancies: [],
  savedVacancies: [],
  searchParams: undefined,
  cities: [],
  selectedCity: undefined,
};

export default function job(baseState = initialState, action) {
  switch (action.type) {
    case SELECT_JOB:
      return produce(baseState, (draftState) => {
        draftState.selectedJob = action.job;
      });
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
    case CLEAN_SAVED_VACANCIES:
      return produce(baseState, (draftState) => {
        draftState.savedVacancies = [];
      });
    case ADD_SAVED_VACANCY:
      return produce(baseState, (draftState) => {
        draftState.savedVacancies.push(action.vacancy);
      });
    case DELETE_SAVED_VACANCY:
      return produce(baseState, (draftState) => {
        const id = action.vacancyId;
        const predicate = (e) => e._id !== id;
        draftState.savedVacancies = draftState.savedVacancies.filter(predicate);
      });
    case SET_SEARCH_PARAMS:
      return produce(baseState, (draftState) => {
        draftState.searchParams = action.searchParams;
      });
    case REMOVE_SEARCH_PARAMS:
      return produce(baseState, (draftState) => {
        draftState.searchParams = undefined;
      });
    case SET_CITIES:
      return produce(baseState, (draftState) => {
        draftState.cities = action.cities;
      });
    case SET_SELECTED_CITY:
      return produce(baseState, (draftState) => {
        draftState.selectedCity = action.city;
      });
    default:
      return baseState;
  }
}
