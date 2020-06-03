import apiRouts from "./apiRouts";
import chai from "chai";
chai.should();

const jobId = "5e93293ddd39d295dae546b1";
const vacancyId = "5ed7adc3661f3e11da77d6c3";

const ROOT = "/api/rest";
const JOBS = `${ROOT}/jobs`;
const JOBS_WITH_ID = `${ROOT}/jobs/${jobId}`;
const VACANCIES = `${ROOT}/jobs/${jobId}/vacancies`;
const VACANCIES_WITH_ID = `${ROOT}/jobs/${jobId}/vacancies/${vacancyId}`;

describe("API Routs Test", () => {
  it("should create jobs end point properly", () => {
    const jobs = apiRouts.jobs();
    jobs.should.to.be.equal(JOBS);
  });

  it("should create jobs end point with id properly", () => {
    const jobsWithId = apiRouts.jobsWithId(jobId);
    jobsWithId.should.to.be.equal(JOBS_WITH_ID);
  });

  it("should create vacancies end point properly", () => {
    const vacancies = apiRouts.vacancies(jobId);
    vacancies.should.to.be.equal(VACANCIES);
  });

  it("should create vacancies with id end point properly", () => {
    const vacanciesWithId = apiRouts.vacanciesWithId(jobId, vacancyId);
    vacanciesWithId.should.to.be.equal(VACANCIES_WITH_ID);
  });
});
