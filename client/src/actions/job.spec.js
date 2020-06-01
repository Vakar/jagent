import * as actions from "./job";

import {
  ADD_SAVED_VACANCY,
  CLEAN_FOUND_VACANCIES,
  DELETE_SAVED_VACANCY,
  REMOVE_SEARCH_PARAMS,
  SET_FOUND_VACANCIES,
  SET_JOB_NAME,
  SET_SAVED_VACANCIES,
  SET_SEARCH_PARAMS,
} from "./types";

import SearchParamsBuilder from "../models/searchParamsBuilder";
import VacancyBuilder from "../models/vacancyBuilder";
import chai from "chai";

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

const vacancies = [vacancy];

const searchParams = new SearchParamsBuilder()
  .withCountry("Great Britain")
  .withCityName("London")
  .withKeyWords("JS developer")
  .build();

describe("vacancy actions", () => {
  it("setJobName should create SET_JOB_NAME action", () => {
    actions.setJobName(jobName).should.to.deep.equal({
      type: SET_JOB_NAME,
      jobName,
    });
  });

  it("addSearchedVacancies should create SET_FOUND_VACANCIES action", () => {
    actions.setFoundVacancies(vacancies).should.to.deep.equal({
      type: SET_FOUND_VACANCIES,
      vacancies,
    });
  });

  it("cleanSearchedVacancies should create CLEAN_FOUND_VACANCIES action", () => {
    actions.cleanFoundVacancies().should.to.deep.equal({
      type: CLEAN_FOUND_VACANCIES,
    });
  });

  it("setSavedVacancies should create SET_SAVED_VACANCIES action", () => {
    actions.setSavedVacancies(vacancies).should.to.deep.equal({
      type: SET_SAVED_VACANCIES,
      vacancies,
    });
  });

  it("addSavedVacancy should create ADD_SAVED_VACANCY action", () => {
    actions.addSavedVacancy(vacancy).should.to.deep.equal({
      type: ADD_SAVED_VACANCY,
      vacancy,
    });
  });

  it("deleteRemovedVacancy should create DELETE_SAVED_VACANCY action", () => {
    actions.deleteSavedVacancy(vacancy).should.to.deep.equal({
      type: DELETE_SAVED_VACANCY,
      vacancy,
    });
  });

  it("setSearchParams should create SET_SEARCH_PARAMS action", () => {
    actions.setSearchParams(searchParams).should.to.deep.equal({
      type: SET_SEARCH_PARAMS,
      searchParams,
    });
  });

  it("removeSearchParams should create REMOVE_SEARCH_PARAMS action", () => {
    actions.removeSearchParams().should.to.deep.equal({
      type: REMOVE_SEARCH_PARAMS,
    });
  });
});
