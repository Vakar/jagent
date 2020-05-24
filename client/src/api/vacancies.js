import { ERROR, SUCCESS } from "../models/alertTypes";
import {
  addVacancy,
  deleteVacancy,
  getVacancies,
  setSystemAlert,
} from "../actions";

import API from "./apiRouts";
import Alert from "../models/alert";
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
      .catch(() => {
        dispatch(
          setSystemAlert(new Alert("can't load vacancies from server", ERROR))
        );
      });
  };
};

export const removeVacancy = (id) => {
  const url = API.deleteVacancy(id);
  return (dispatch) => {
    fetch(url, { method: "DELETE" })
      .then(() => {
        dispatch(deleteVacancy(id));
        dispatch(
          setSystemAlert(new Alert("successfully remove vacancy"), SUCCESS)
        );
      })
      .catch(() => {
        dispatch(
          setSystemAlert(new Alert("can't remove vacancy from server", ERROR))
        );
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
        const json = res.json();
        return json;
      })
      .then((res) => {
        const savedVacancy = new Vacancy(res._id, res.name);
        dispatch(addVacancy(savedVacancy));
        dispatch(
          setSystemAlert(new Alert("successfully save vacancy"), SUCCESS)
        );
      })
      .catch(() => {
        dispatch(setSystemAlert(new Alert("can't save vacancy", ERROR)));
      });
  };
};
