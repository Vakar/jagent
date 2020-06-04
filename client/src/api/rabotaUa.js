import VacancyBuilder from "../models/vacancyBuilder";
import { fetchWithActionFn } from "./core/commonFetch";
import { getUrlWithParams } from "./utils/urlUtils";
import { setFoundVacancies } from "../actions";

const VACANCY_SEARCH_URL = "https://api.rabota.ua/vacancy/search";

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
  const url = getUrlWithParams(VACANCY_SEARCH_URL, searchParams);
  const request = new Request(url);
  return fetchWithActionFn(request, setFoundVacancies, mapper);
};
