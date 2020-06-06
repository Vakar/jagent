import { setFoundVacancies, setSystemAlert } from "../actions";

import Alert from "../models/alert";
import { ERROR } from "../models/alertTypes";
import VacancyBuilder from "../models/vacancyBuilder";
import { fetchWithActionFn } from "./core/commonFetch";
import { getUrlWithParams } from "./utils/urlUtils";

const ROOT = "https://api.rabota.ua";
const VACANCY_URL = `${ROOT}/vacancy`;

const mapper = (obj) => {
  const vacancies = obj.documents;
  return vacancies.map((v) => {
    return new VacancyBuilder()
      .withVacancyId(v.id)
      .withName(v.name)
      .withDate(new Date(v.date))
      .withCompanyName(v.companyName)
      .withShortDescription(v.shortDescription)
      .build();
  });
};

export const fetchVacancies = (searchParams) => {
  const url = getUrlWithParams(`${VACANCY_URL}/search`, searchParams);
  const request = new Request(url);
  return fetchWithActionFn(request, setFoundVacancies, mapper);
};

export const openVacancyPage = (vacancyId) => {
  const vacancyApiUrl = getUrlWithParams(VACANCY_URL, { id: vacancyId });
  return (dispatch) => {
    fetch(vacancyApiUrl)
      .then((res) => res.json())
      .then((body) => {
        const companyId = body.notebookId;
        const vacancyPageUrl = `https://rabota.ua/company${companyId}/vacancy${vacancyId}`;
        window.open(vacancyPageUrl, "_blank");
      })
      .catch(() => {
        const alertError = new Alert("can't find vacancy page url", ERROR);
        const systemAlertError = setSystemAlert(alertError);
        dispatch(systemAlertError);
      });
  };
};
