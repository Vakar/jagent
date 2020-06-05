import {
  addSavedVacancy,
  deleteSavedVacancy,
  setSavedVacancies,
} from "../actions";
import { fetchWithAction, fetchWithActionFn } from "./core/commonFetch";

import API from "./apiRouts";
import VacancyBuilder from "../models/vacancyBuilder";

const mapper = (obj) => {
  return new VacancyBuilder()
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
  const request = new Request(url);
  return fetchWithActionFn(request, setSavedVacancies, mapper);
};

export const saveVacancy = (jobId, vacancy) => {
  const url = API.vacancies(jobId);
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vacancy),
  });
  return fetchWithActionFn(request, addSavedVacancy, mapper);
};

export const removeVacancy = (jobId, vacancyId) => {
  const url = API.vacanciesWithId(jobId, vacancyId);
  const request = new Request(url, { method: "DELETE" });
  const action = deleteSavedVacancy(vacancyId);
  return fetchWithAction(request, action);
};
