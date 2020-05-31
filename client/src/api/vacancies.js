import { ERROR, SUCCESS } from "../models/alertTypes";
import { addSavedVacancy, setSavedVacancies, setSystemAlert } from "../actions";

import API from "./apiRouts";
import Alert from "../models/alert";

const mapToVacancy = (obj) => {
  new VacancyBuilder()
    .with_id(obj._id)
    .withVacancyId(obj.vacancyId)
    .withName(obj.name)
    .withDate(new Date(obj.date))
    .withCompanyName(obj.companyName)
    .withShortDescription(obj.shortDescription)
    .build();
};

export const fetchVacancies = (jobId) => {
  const url = API.vacancies(jobId);
  return (dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        const vacancies = res.map((obj) => mapToVacancy(obj));
        dispatch(setSavedVacancies(vacancies));
      })
      .catch(() => {
        const alert = new Alert("can't load saved vacancies", ERROR);
        dispatch(setSystemAlert(alert));
      });
  };
};

export const removeVacancy = (jobId, vacancyId) => {
  const url = API.deleteVacancy(jobId, vacancyId);
  return (dispatch) => {
    fetch(url, { method: "DELETE" })
      .then(() => {
        dispatch(deleteRemovedVacancy(vacancyId));
        const alert = new Alert("vacancy removed", SUCCESS);
        dispatch(setSystemAlert(alert));
      })
      .catch(() => {
        const alert = new Alert("can't remove vacancy from database", ERROR);
        dispatch(setSystemAlert(alert));
      });
  };
};

export const saveVacancy = (jobId, vacancy) => {
  const url = API.vacancies(jobId);
  return (dispatch) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vacancy),
    })
      .then((res) => res.json())
      .then((obj) => {
        const vacancy = mapToVacancy(obj);
        dispatch(addSavedVacancy(vacancy));
        const alert = new Alert("vacancy saved", SUCCESS);
        dispatch(setSystemAlert(alert));
      })
      .catch(() => {
        const alert = new Alert("can't save vacancy", ERROR);
        dispatch(setSystemAlert(alert));
      });
  };
};
