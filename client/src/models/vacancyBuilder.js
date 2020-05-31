import Vacancy from "./vacancy";

export default class VacancyBuilder {
  with_id(_id) {
    this._id = _id;
    return this;
  }

  withVacancyId(vacancyId) {
    this.vacancyId = vacancyId;
    return this;
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withDate(date) {
    this.date = date;
    return this;
  }

  withCompanyName(companyName) {
    this.companyName = companyName;
    return this;
  }

  withShortDescription(shortDescription) {
    this.shortDescription = shortDescription;
    return this;
  }

  build() {
    if (!("_id" in this)) {
      throw new Error("_id is missing");
    }
    if (!("vacancyId" in this)) {
      throw new Error("vacancy id is missing");
    }
    if (!("name" in this)) {
      throw new Error("name is missing");
    }
    if (!("date" in this)) {
      throw new Error("date is missing");
    }
    if (!("companyName" in this)) {
      throw new Error("company name is missing");
    }
    if (!("shortDescription" in this)) {
      throw new Error("short description is missing");
    }
    return new Vacancy(
      this._id,
      this.vacancyId,
      this.name,
      this.date,
      this.companyName,
      this.shortDescription
    );
  }
}
