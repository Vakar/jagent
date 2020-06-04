import { fetchVacancies } from "./rabotaUa";
import { getUrlWithParams } from "./utils/urlUtils";

/* URL */
const VACANCY_SEARCH_URL = "https://api.rabota.ua/vacancy/search";

/* Request info objects */
const searchParams = {
  ukrainian: true,
  keyWords: "java",
  cityId: 21,
};
const FULL_URL = getUrlWithParams(VACANCY_SEARCH_URL, searchParams);
const GET_REQUEST = new Request(FULL_URL);

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
    const fn = fetchVacancies(searchParams);
    fn(dispatchFn);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(GET_REQUEST);
  });
});
