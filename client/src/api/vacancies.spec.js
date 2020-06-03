import { fetchVacancies, removeVacancy, saveVacancy } from "./vacancies";

import VacancyBuilder from "../models/vacancyBuilder";
import apiRouts from "./apiRouts";

/* Models id*/
const jobId = "5e93293ddd39d295dae546b1";
const vacancyId = "5ed7adc3661f3e11da77d6c3";

/* API URLs */
const VACANCIES_URL = apiRouts.vacancies(jobId);
const VACANCIES_WITH_ID_URL = apiRouts.vacanciesWithId(jobId, vacancyId);

/* Request info objects */
const vacancy = new VacancyBuilder()
  .withVacancyId("1234")
  .withName("vacancy name")
  .withDate(new Date())
  .withCompanyName("company name")
  .withShortDescription("short description")
  .build();

const post = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(vacancy),
};

const GET_REQUEST = new Request(VACANCIES_URL);
const POST_REQUEST = new Request(VACANCIES_URL, post);
const DELETE_REQUEST = new Request(VACANCIES_WITH_ID_URL, { method: "DELETE" });

/* Mocks */
const mockSuccessResponse = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });

const dispatchFn = jest.fn();

describe("Vacancies API Client Test", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it(`FETCH: should use correct url & request info object 
  when fetching vacancies from server`, () => {
    const fn = fetchVacancies(jobId);
    fn(dispatchFn);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(GET_REQUEST);
  });

  it(`SAVE: should use correct url & request info object 
  when saving vacancy to server`, () => {
    const fn = saveVacancy(jobId, vacancy);
    fn(dispatchFn);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(POST_REQUEST);
  });

  it(`DELETE: should use correct url & request info object 
  when deleting vacancies from server`, () => {
    const fn = removeVacancy(jobId, vacancyId);
    fn(dispatchFn);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(DELETE_REQUEST);
  });
});
