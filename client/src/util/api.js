export default class Api {
  static #API_PREFIX = "/api/rest";
  static #COMPANIES_PREFIX = "/companies";

  GET_COMPANIES() {
    return `${this.API_PREFIX}${this.COMPANIES_PREFIX}`;
  }

  static deleteCompany(id) {
    return `${this.#API_PREFIX}${this.#COMPANIES_PREFIX}/${id}`;
  }
}
