import {
  ADD_SAVED_VACANCY,
  CLEAN_FOUND_VACANCIES,
  DELETE_SAVED_VACANCY,
  REMOVE_SEARCH_PARAMS,
  SELECT_JOB,
  SET_FOUND_VACANCIES,
  SET_SAVED_VACANCIES,
  SET_SEARCH_PARAMS,
} from "./types";

export const selectJob = (job) => ({
  type: SELECT_JOB,
  job,
});

export const setFoundVacancies = (vacancies) => ({
  type: SET_FOUND_VACANCIES,
  vacancies,
});

export const cleanFoundVacancies = () => ({
  type: CLEAN_FOUND_VACANCIES,
});

export const setSavedVacancies = (vacancies) => ({
  type: SET_SAVED_VACANCIES,
  vacancies,
});

export const addSavedVacancy = (vacancy) => ({
  type: ADD_SAVED_VACANCY,
  vacancy,
});

export const deleteSavedVacancy = (vacancy) => ({
  type: DELETE_SAVED_VACANCY,
  vacancy,
});

export const setSearchParams = (searchParams) => ({
  type: SET_SEARCH_PARAMS,
  searchParams,
});

export const removeSearchParams = () => ({
  type: REMOVE_SEARCH_PARAMS,
});
