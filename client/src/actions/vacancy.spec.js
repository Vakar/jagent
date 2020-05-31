import * as actions from "./vacancy";

import {
  ADD_SAVED_VACANCY,
  CLEAN_FOUND_VACANCIES,
  DELETE_SAVED_VACANCY,
  SET_FOUND_VACANCIES,
  SET_SAVED_VACANCIES,
} from "./types";

import VacancyBuilder from "../models/vacancyBuilder";
import chai from "chai";

chai.should();

const vacancy = new VacancyBuilder()
  .with_id("5e93293ddd39d295dae546b1")
  .withVacancyId("vacancyId")
  .withName("name")
  .withDate(new Date())
  .withCompanyName("company name")
  .withShortDescription("short description")
  .build();

const vacancies = [vacancy];

describe("vacancy actions", () => {
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
});
