import {
  addSavedVacancy,
  cleanFoundVacancies,
  deleteSavedVacancy,
  setFoundVacancies,
  setSavedVacancies,
} from "../actions";

import VacancyBuilder from "../models/vacancyBuilder";
import chai from "chai";
import vacancies from "./vacancy";

chai.should();

const vacancy = new VacancyBuilder()
  .with_id("5e93293ddd39d295dae546b1")
  .withVacancyId("vacancyId")
  .withName("name")
  .withDate(new Date())
  .withCompanyName("company name")
  .withShortDescription("short description")
  .build();

let emptyState;
let fullState;

describe("vacancies reducer", () => {
  beforeEach(() => {
    emptyState = {
      foundVacancies: [],
      savedVacancies: [],
    };
    fullState = {
      foundVacancies: [vacancy],
      savedVacancies: [vacancy],
    };
  });

  it("should handle initial state", () => {
    vacancies(undefined, {}).should.to.deep.equal(emptyState);
  });

  it("SET_FOUND_VACANCIES | should set found vacancies to array", () => {
    const action = setFoundVacancies([vacancy]);
    fullState.savedVacancies = [];
    vacancies(emptyState, action).should.to.deep.equal(fullState);
  });

  it("CLEAN_FOUND_VACANCIES | should clean found vacancies array", () => {
    const action = cleanFoundVacancies();
    emptyState.savedVacancies = [vacancy];
    vacancies(fullState, action).should.to.deep.equal(emptyState);
  });

  it("SET_SAVED_VACANCIES | should set saved vacancy to savedVacancies array", () => {
    const action = setSavedVacancies([vacancy]);
    fullState.foundVacancies = [];
    vacancies(emptyState, action).should.to.deep.equal(fullState);
  });

  it("ADD_SAVED_VACANCY | should add saved vacancy to savedVacancies array", () => {
    const action = addSavedVacancy(vacancy);
    fullState.foundVacancies = [];
    vacancies(emptyState, action).should.to.deep.equal(fullState);
  });

  it("DELETE_SAVED_VACANCY | should delete removed vacancy from saved vacancies array", () => {
    const action = deleteSavedVacancy(vacancy);
    emptyState.foundVacancies = [vacancy];
    vacancies(fullState, action).should.to.deep.equal(emptyState);
  });
});
