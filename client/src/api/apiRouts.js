export default class Api {
  static #API = "/api/rest";
  static #JOBS = "jobs";
  static #VACANCIES = "vacancies";
  static #RABOTA_UA = "foreign/rabotaUa";

  /* API ROUTS */

  /* -> JOB */
  static jobs() {
    return `${this.#API}/${this.#JOBS}`;
  }

  static jobsWithId(id) {
    return `${this.#API}/${this.#JOBS}/${id}`;
  }

  /* -> VACANCIES */
  static vacancies(jobId) {
    return `${this.jobsWithId(jobId)}/${this.#VACANCIES}`;
  }

  static vacanciesWithId(jobId, vacancyId) {
    return `${this.jobsWithId(jobId)}/${this.#VACANCIES}/${vacancyId}`;
  }

  /* RABOTA UA */

  static rabotaUaSearch() {
    return `${this.#API}/${this.#RABOTA_UA}/search`;
  }

  static rabotaUaPageUrl() {
    return `${this.#API}/${this.#RABOTA_UA}/vacancyPageUrl`;
  }
}
