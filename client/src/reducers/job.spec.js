import {
  addSavedVacancy,
  cleanFoundVacancies,
  deleteSavedVacancy,
  removeSearchParams,
  setFoundVacancies,
  setJobName,
  setSavedVacancies,
  setSearchParams,
} from "../actions";

import SearchParamsBuilder from "../models/searchParamsBuilder";
import VacancyBuilder from "../models/vacancyBuilder";
import chai from "chai";
import job from "./job";

chai.should();

const jobName = "job name";

const vacancy = new VacancyBuilder()
  .with_id("5e93293ddd39d295dae546b1")
  .withVacancyId("vacancyId")
  .withName("name")
  .withDate(new Date())
  .withCompanyName("company name")
  .withShortDescription("short description")
  .build();

const searchParams = new SearchParamsBuilder()
  .withCountry("Great Britain")
  .withCityName("London")
  .withKeyWords("JS developer")
  .build();

let emptyState;
let fullState;

describe("job reducer", () => {
  beforeEach(() => {
    emptyState = {
      jobName: undefined,
      foundVacancies: [],
      savedVacancies: [],
      searchParams: undefined,
    };
    fullState = {
      jobName: undefined,
      foundVacancies: [vacancy],
      savedVacancies: [vacancy],
      searchParams: searchParams,
    };
  });

  it("should handle initial state", () => {
    job(undefined, {}).should.to.deep.equal(emptyState);
  });

  it("SET_JOB_NAME | should set job name", () => {
    const action = setJobName(jobName);
    const expected = Object.assign({}, emptyState);
    expected.jobName = jobName;
    job(emptyState, action).should.to.deep.equal(expected);
  });

  it("SET_FOUND_VACANCIES | should set found vacancies to array", () => {
    const action = setFoundVacancies([vacancy]);
    const expected = Object.assign({}, emptyState);
    expected.foundVacancies = [vacancy];
    job(emptyState, action).should.to.deep.equal(expected);
  });

  it("CLEAN_FOUND_VACANCIES | should clean found vacancies array", () => {
    const action = cleanFoundVacancies();
    const expected = Object.assign({}, fullState);
    expected.foundVacancies = [];
    job(fullState, action).should.to.deep.equal(expected);
  });

  it("SET_SAVED_VACANCIES | should set saved vacancy to savedVacancies array", () => {
    const action = setSavedVacancies([vacancy]);
    const expected = Object.assign({}, emptyState);
    expected.savedVacancies = [vacancy];
    job(emptyState, action).should.to.deep.equal(expected);
  });

  it("ADD_SAVED_VACANCY | should add saved vacancy to savedVacancies array", () => {
    const action = addSavedVacancy(vacancy);
    const expected = Object.assign({}, emptyState);
    expected.savedVacancies = [vacancy];
    job(emptyState, action).should.to.deep.equal(expected);
  });

  it("DELETE_SAVED_VACANCY | should delete removed vacancy from saved vacancies array", () => {
    const action = deleteSavedVacancy(vacancy);
    const expected = Object.assign({}, fullState);
    expected.savedVacancies = [];
    job(fullState, action).should.to.deep.equal(expected);
  });

  it("SET_SEARCH_PARAMS | should set search params", () => {
    const action = setSearchParams(searchParams);
    const expected = Object.assign({}, emptyState);
    expected.searchParams = searchParams;
    job(emptyState, action).should.to.deep.equal(expected);
  });

  it("REMOVE_SEARCH_PARAMS | should remove search params", () => {
    const action = removeSearchParams();
    const expected = Object.assign({}, fullState);
    expected.searchParams = undefined;
    job(fullState, action).should.to.deep.equal(expected);
  });
});
