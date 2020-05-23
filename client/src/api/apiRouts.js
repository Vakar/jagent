export default class Api {
  static #API_PREFIX = "/api/rest";
  static #VACANCIES_PREFIX = "/vacancies";

  static vacancies() {
    return `${this.#API_PREFIX}${this.#VACANCIES_PREFIX}`;
  }

  static deleteVacancy(id) {
    return `${this.#API_PREFIX}${this.#VACANCIES_PREFIX}/${id}`;
  }
}
