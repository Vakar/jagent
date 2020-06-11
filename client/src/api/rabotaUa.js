import { setFoundVacancies, setSystemAlert } from "../actions";

import API from "./apiRouts";
import Alert from "../models/alert";
import { ERROR } from "../models/alertTypes";
import VacancyBuilder from "../models/vacancyBuilder";
import { fetchWithActionFn } from "./core/commonFetch";
import { getUrlWithParams } from "./utils/urlUtils";

const mapper = (vacancy) => {
  return new VacancyBuilder()
    .withVacancyId(vacancy.id)
    .withName(vacancy.name)
    .withDate(new Date(vacancy.date))
    .withCompanyName(vacancy.companyName)
    .withShortDescription(vacancy.shortDescription)
    .build();
};

export const fetchVacancies = (searchParams) => {
  const searchUrl = API.rabotaUaSearch();
  const requestUrl = getUrlWithParams(searchUrl, searchParams);
  const request = new Request(requestUrl);
  return fetchWithActionFn(request, setFoundVacancies, mapper);
};

export const openVacancyPage = (vacancyId) => {
  const pageUrl = API.rabotaUaPageUrl();
  const requestUrl = getUrlWithParams(pageUrl, { id: vacancyId });
  return (dispatch) => {
    fetch(requestUrl)
      .then((res) => res.json())
      .then((body) => {
        const vacancyPageUrl = body.url;
        window.open(vacancyPageUrl, "_blank");
      })
      .catch(() => {
        const alertError = new Alert("can't find vacancy page url", ERROR);
        const systemAlertError = setSystemAlert(alertError);
        dispatch(systemAlertError);
      });
  };
};
