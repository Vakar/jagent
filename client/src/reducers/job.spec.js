import {
  addSavedVacancy,
  cleanFoundVacancies,
  deleteSavedVacancy,
  removeSearchParams,
  setFoundVacancies,
  setSavedVacancies,
  setSearchParams,
} from "../actions";

import SearchParamsBuilder from "../models/searchParamsBuilder";
import VacancyBuilder from "../models/vacancyBuilder";
import chai from "chai";
import job from "./job";

chai.should();

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
      foundVacancies: [],
      savedVacancies: [],
      searchParams: undefined,
    };
    fullState = {
      foundVacancies: [vacancy],
      savedVacancies: [vacancy],
      searchParams: searchParams,
    };
  });

  it("should handle initial state", () => {
    job(undefined, {}).should.to.deep.equal(emptyState);
  });

  it("SET_FOUND_VACANCIES | should set found vacancies to array", () => {
    const action = setFoundVacancies([vacancy]);
    fullState.savedVacancies = [];
    fullState.searchParams = undefined;
    job(emptyState, action).should.to.deep.equal(fullState);
  });

  it("CLEAN_FOUND_VACANCIES | should clean found vacancies array", () => {
    const action = cleanFoundVacancies();
    emptyState.savedVacancies = [vacancy];
    emptyState.searchParams = searchParams;
    job(fullState, action).should.to.deep.equal(emptyState);
  });

  it("SET_SAVED_VACANCIES | should set saved vacancy to savedVacancies array", () => {
    const action = setSavedVacancies([vacancy]);
    fullState.foundVacancies = [];
    fullState.searchParams = undefined;
    job(emptyState, action).should.to.deep.equal(fullState);
  });

  it("ADD_SAVED_VACANCY | should add saved vacancy to savedVacancies array", () => {
    const action = addSavedVacancy(vacancy);
    fullState.foundVacancies = [];
    fullState.searchParams = undefined;
    job(emptyState, action).should.to.deep.equal(fullState);
  });

  it("DELETE_SAVED_VACANCY | should delete removed vacancy from saved vacancies array", () => {
    const action = deleteSavedVacancy(vacancy);
    emptyState.foundVacancies = [vacancy];
    emptyState.searchParams = searchParams;
    job(fullState, action).should.to.deep.equal(emptyState);
  });

  it("SET_SEARCH_PARAMS | should set search params", () => {
    const action = setSearchParams(searchParams);
    fullState.foundVacancies = [];
    fullState.savedVacancies = [];
    job(emptyState, action).should.to.deep.equal(fullState);
  });

  it("REMOVE_SEARCH_PARAMS | should remove search params", () => {
    const action = removeSearchParams();
    emptyState.foundVacancies = [vacancy];
    emptyState.savedVacancies = [vacancy];
    job(fullState, action).should.to.deep.equal(emptyState);
  });
});
