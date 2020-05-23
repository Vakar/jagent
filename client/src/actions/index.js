import * as types from "./types";

/* Vacancies actions */
export const addVacancy = (vacancy) => ({ type: types.ADD_VACANCY, vacancy });
export const deleteVacancy = (id) => ({ type: types.DELETE_VACANCY, id });
export const editVacancy = (vacancy) => ({ type: types.EDIT_VACANCY, vacancy });
export const getVacancies = (vacancies) => ({
  type: types.GET_VACANCIES,
  vacancies,
});

/* General actions */
export const errorAction = (error) => ({ type: types.ERROR, error });
