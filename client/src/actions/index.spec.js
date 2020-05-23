import * as actions from "./index";
import * as types from "./types";

import Vacancy from "../models/vacancy";
import chai from "chai";

chai.should();

const vacancy = new Vacancy("5ebd5eb9b7dd175ce77e904a", "vacancy_name");
const vacancy2 = new Vacancy("5ebd5eb9b7gd175ce77e904a", "vacancy2_name");
const vacancies = [vacancy, vacancy2];

describe("vacancy actions", () => {
  it("addVacancy should create ADD_VACANCY action", () => {
    actions.addVacancy(vacancy).should.to.deep.equal({
      type: types.ADD_VACANCY,
      vacancy: vacancy,
    });
  });

  it("deleteVacancy should create DELETE_VACANCY action", () => {
    actions.deleteVacancy(vacancy.id).should.to.deep.equal({
      type: types.DELETE_VACANCY,
      id: vacancy.id,
    });
  });

  it("editVacancy should create EDIT_VACANCY action", () => {
    actions.editVacancy(vacancy).should.to.deep.equal({
      type: types.EDIT_VACANCY,
      vacancy: vacancy,
    });
  });

  it("getVacancies should create GET_VACANCIES action", () => {
    actions.getVacancies(vacancies).should.to.deep.equal({
      type: types.GET_VACANCIES,
      vacancies: vacancies,
    });
  });

  it("errorAction should create ERROR action", () => {
    const errorMessage = "error message";
    actions.errorAction(errorMessage).should.to.deep.equal({
      type: types.ERROR,
      error: errorMessage,
    });
  });
});
