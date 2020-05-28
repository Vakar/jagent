export default class Api {
  static #API_PREFIX = "/api/rest";
  static #JOBS_PREFIX = "/jobs";

  static jobs() {
    return `${this.#API_PREFIX}${this.#JOBS_PREFIX}`;
  }

  static deleteJob(id) {
    return `${this.#API_PREFIX}${this.#JOBS_PREFIX}/${id}`;
  }
}
