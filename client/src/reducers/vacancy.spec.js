import { addVacancy, deleteVacancy, editVacancy } from "../actions";

import Vacancy from "../models/vacancy";
import chai from "chai";
import vacancies from "./vacancy";

chai.should();

let defaultVacancy;
let newVacancy;

let initialState;
let fullState;

describe("vacancies reducer", () => {
  beforeEach(() => {
    defaultVacancy = new Vacancy("5e93293ddd39d295dae546b1", "default_vacancy");
    newVacancy = new Vacancy("5ebd5eb9b7dd175ce77e904a", "vacancy_name");
    initialState = {
      error: null,
      selectedVacancy: null,
      vacancies: [],
    };
    fullState = {
      selectedVacancy: defaultVacancy,
      vacancies: [defaultVacancy, newVacancy],
    };
  });

  it("should handle initial state", () => {
    vacancies(undefined, {}).should.to.deep.equal(initialState);
  });

  it("ADD_VACANCY | should add vacancy to vacancies array ", () => {
    const addAction = addVacancy(newVacancy);
    vacancies(initialState, addAction).should.to.deep.equal({
      error: null,
      selectedVacancy: null,
      vacancies: [newVacancy],
    });
  });

  it("DELETE_VACANCY | should delete vacancy from vacancies array", () => {
    const deleteAction = deleteVacancy(defaultVacancy.id);
    vacancies(fullState, deleteAction).should.to.deep.include({
      vacancies: [newVacancy],
    });
  });

  it("DELETE_VACANCY | should delete vacancy from selected if it selected", () => {
    const deleteAction = deleteVacancy(defaultVacancy.id);
    vacancies(fullState, deleteAction).should.to.deep.include({
      selectedVacancy: undefined,
    });
  });

  it("DELETE_VACANCY | shouldn't delete vacancy from selected if it's not selected", () => {
    const deleteAction = deleteVacancy(defaultVacancy.id);
    fullState.selectedVacancy = newVacancy;
    vacancies(fullState, deleteAction).should.to.deep.include({
      selectedVacancy: newVacancy,
    });
  });

  it("EDIT_VACANCY | should update vacancy in array", () => {
    const updatedVacancy = new Vacancy(defaultVacancy.id, "new_vacancy_name");
    const editAction = editVacancy(updatedVacancy);
    vacancies(fullState, editAction).should.to.deep.include({
      vacancies: [updatedVacancy, newVacancy],
    });
  });

  it("EDIT_VACANCY | shouldn't update selected vacancy if it's not selected", () => {
    const updatedVacancy = new Vacancy(newVacancy.id, "new_vacancy_name");
    const editAction = editVacancy(updatedVacancy);
    vacancies(fullState, editAction).should.to.deep.include({
      selectedVacancy: defaultVacancy,
    });
  });

  it("EDIT_VACANCY | should update selected vacancy if it's selected", () => {
    const updatedVacancy = new Vacancy(defaultVacancy.id, "new_vacancy_name");
    const editAction = editVacancy(updatedVacancy);
    vacancies(fullState, editAction).should.to.deep.include({
      selectedVacancy: updatedVacancy,
    });
  });
});
