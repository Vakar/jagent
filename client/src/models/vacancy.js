export default class Vacancy {
  constructor(_id, vacancyId, name, date, companyName, shortDescription) {
    this._id = _id;
    this.vacancyId = vacancyId;
    this.name = name;
    this.date = date;
    this.companyName = companyName;
    this.shortDescription = shortDescription;
  }
}
