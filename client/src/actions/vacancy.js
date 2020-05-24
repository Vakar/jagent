import {
  ADD_VACANCY,
  DELETE_VACANCY,
  EDIT_VACANCY,
  GET_VACANCIES,
} from "./types";

export const addVacancy = (vacancy) => ({
  type: ADD_VACANCY,
  vacancy,
});

export const deleteVacancy = (id) => ({
  type: DELETE_VACANCY,
  id,
});

export const editVacancy = (vacancy) => ({
  type: EDIT_VACANCY,
  vacancy,
});

export const getVacancies = (vacancies) => ({
  type: GET_VACANCIES,
  vacancies,
});
