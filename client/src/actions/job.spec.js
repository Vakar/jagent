import * as actions from "./job";

import {
  ADD_SAVED_VACANCY,
  CLEAN_FOUND_VACANCIES,
  CLEAN_SAVED_VACANCIES,
  DELETE_SAVED_VACANCY,
  REMOVE_SEARCH_PARAMS,
  SELECT_JOB,
  SET_FOUND_VACANCIES,
  SET_SAVED_VACANCIES,
  SET_SEARCH_PARAMS,
} from "./types";

import Job from "../models/job";
import SearchParamsBuilder from "../models/searchParamsBuilder";
import VacancyBuilder from "../models/vacancyBuilder";
import chai from "chai";

chai.should();

const job = new Job("39d295dae546b15e93293ddd", "job name");

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
  it("selectJob should create SET_JOB_NAME action", () => {
    actions.selectJob(job).should.to.deep.equal({
      type: SELECT_JOB,
      job: job,
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

  it("cleanSavedVacancies should create CLEAN_SAVED_VACANCIES action", () => {
    actions.cleanSavedVacancies().should.to.deep.equal({
      type: CLEAN_SAVED_VACANCIES,
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
