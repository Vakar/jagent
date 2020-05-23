import {
  addVacancy,
  deleteVacancy,
  errorAction,
  getVacancies,
} from "../actions";

import API from "./apiRouts";
import Vacancy from "../models/vacancy";

export const fetchVacancies = () => {
  const url = API.vacancies();
  return (dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        const vacancies = res.map((e) => new Vacancy(e._id, e.name));
        dispatch(getVacancies(vacancies));
        return res;
      })
      .catch((error) => {
        dispatch(errorAction(error));
      });
  };
};

export const removeVacancy = (id) => {
  const url = API.deleteVacancy(id);
  return (dispatch) => {
    fetch(url, { method: "DELETE" })
      .then(() => {
        dispatch(deleteVacancy(id));
      })
      .catch((error) => {
        dispatch(errorAction(error));
      });
  };
};

export const saveVacancy = (name) => {
  return (dispatch) => {
    fetch(API.vacancies(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        const savedVacancy = new Vacancy(res._id, res.name);
        dispatch(addVacancy(savedVacancy));
      })
      .catch((error) => {
        dispatch(errorAction(error));
      });
  };
};
