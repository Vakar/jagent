export default class Api {
  static #API_PREFIX = "/api/rest";
  static #COMPANIES_PREFIX = "/companies";

  static companies() {
    return `${this.#API_PREFIX}${this.#COMPANIES_PREFIX}`;
  }

  static deleteCompany(id) {
    return `${this.#API_PREFIX}${this.#COMPANIES_PREFIX}/${id}`;
  }
}
