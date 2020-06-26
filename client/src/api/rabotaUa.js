import { setCities, setFoundVacancies, setSystemAlert } from "../actions";

import API from "./apiRouts";
import Alert from "../models/alert";
import City from "../models/city";
import { ERROR } from "../models/alertTypes";
import VacancyBuilder from "../models/vacancyBuilder";
import { fetchWithActionFn } from "./core/commonFetch";
import { getUrlWithParams } from "./utils/urlUtils";

const citiesMapper = (city) => {
  return new City(city.en, city.id);
};

const vacancyMapper = (vacancy) => {
  return new VacancyBuilder()
    .withVacancyId(vacancy.id)
    .withName(vacancy.name)
    .withDate(new Date(vacancy.date))
    .withCompanyName(vacancy.companyName)
    .withShortDescription(vacancy.shortDescription)
    .build();
};

export const fetchCities = () => {
  const citiesUrl = API.rabotaUaCities();
  const request = new Request(citiesUrl);
  return fetchWithActionFn(request, setCities, citiesMapper);
};

export const fetchVacancies = (searchParams) => {
  const searchUrl = API.rabotaUaSearch();
  const requestUrl = getUrlWithParams(searchUrl, searchParams);
  const request = new Request(requestUrl);
  return fetchWithActionFn(request, setFoundVacancies, vacancyMapper);
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
