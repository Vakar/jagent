export default class Api {
  static #API = "/api/rest";
  static #JOBS = "/jobs";
  static #VACANCIES = "/vacancies";

  /* API ROUTS */

  /* -> JOB */
  static jobs() {
    return `${this.#API}${this.#JOBS}`;
  }

  static deleteJob(id) {
    return `${this.#API}${this.#JOBS}/${id}`;
  }

  /* -> VACANCIES */
  static vacancies(jobId) {
    return `${this.#API}${this.#JOBS}/${jobId}/${this.#VACANCIES}`;
  }

  static deleteVacancy(jobId, vacancyId) {
    return `${this.#API}${this.#JOBS}/${jobId}/${this.#VACANCIES}/${vacancyId}`;
  }
}
