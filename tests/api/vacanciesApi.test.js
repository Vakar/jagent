const { connect, populate, clear, close } = require("../utils/db.mock");
const chai = require("chai");
const Vacancy = require("../../models/vacancy");
const bcrypt = require("bcrypt");
const { HTTP_OK } = require("../../constants/httpCodes");
const { credentials, apiRoot } = require("../utils/testConstants");
const { authorize } = require("../utils/authorizeSession");
const User = require("../../models/user");
const Job = require("../../models/job");

/* Config chai */
chai.should();

/** Vacancies api path. */
const API_PATH = `${apiRoot}/jobs/:jobId/vacancies`;

/** Authorized session for api testing */
let authorizedSession;

/* USERS COLLECTION CONFIGURATION | START */

/** User for saving to database. */
const user = Object.assign({}, credentials);

/** Saved to database user. */
let savedUser;

/**
 * Populate users database collection with one user.
 * @param userObj User js object for saving in database.
 *
 * @return Saved user js object.
 */
const populateUser = async (userObj) => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const payload = { password: pswdHash };
  return await populate(userObj, User, payload);
};

/* USERS COLLECTION CONFIGURATION | END */

/* JOBS COLLECTION CONFIGURATION | START */

/** Job object for saving to database. */
const job = { name: "job name" };

/** Saved user job. */
let savedJob;

/* JOBS COLLECTION CONFIGURATION | END */

/* VACANCIES COLLECTION CONFIGURATION | START */

/** Array of saved job vacancies */

/** Vacancy object for saving to database. */
const vacancy = {
  vacancyId: "1",
  name: "vacancy name",
  date: "2020-05-27T12:01:00.533",
  companyName: "company name",
  shortDescription: "short vacancy description",
};

let savedVacancies;

/* VACANCIES COLLECTION CONFIGURATION | END */

describe("VACANCY CONTROLLER TEST", () => {
  beforeEach(async () => {
    await connect();
    savedUser = await populateUser(user);
    const jobPayload = { userId: savedUser._id };
    savedJob = await populate(job, Job, jobPayload);
    const vacancyPayload = { jobId: savedJob._id };
    savedVacancies = [await populate(vacancy, Vacancy, vacancyPayload)];
    authorizedSession = await authorize();
  });

  afterEach(async () => {
    await clear();
    await close();
  });

  it(`GET: ${API_PATH} | get vacancies belong to job`, (done) => {
    authorizedSession
      .get(`${apiRoot}/jobs/${savedJob._id}/vacancies`)
      .expect((res) => {
        res.body.should.to.deep.equal(savedVacancies);
      })
      .expect(HTTP_OK, done);
  });

  it(`POST: ${API_PATH} | save vacancy to database`, async () => {
    const tmp = Object.assign({}, vacancy);
    tmp.vacancyId = "2";
    await authorizedSession
      .post(`${apiRoot}/jobs/${savedJob._id}/vacancies`)
      .send(tmp)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const docs = await Vacancy.find({
      vacancyId: tmp.vacancyId,
    });
    docs.length.should.to.equal(1);
  });

  it(`POST: ${API_PATH} | return saved vacancy as json`, (done) => {
    const tmp = Object.assign({}, vacancy);
    tmp.vacancyId = "2";
    tmp.name = "new vacancy";
    tmp.date = new Date("2020-05-27T12:01:00.533");
    authorizedSession
      .post(`${apiRoot}/jobs/${savedJob._id}/vacancies`)
      .send(tmp)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        tmp.jobId = savedJob._id;
        tmp.date = tmp.date.toISOString();
        res.body.should.to.include(tmp);
      })
      .expect(HTTP_OK, done);
  });

  it(`DELETE: ${API_PATH}/:vacancyId | delete from db by _id`, async () => {
    const vacancyId = savedVacancies[0]._id;
    await authorizedSession
      .delete(`${apiRoot}/jobs/${savedJob._id}/vacancies/${vacancyId}`)
      .expect(HTTP_OK);
    const isVacancyExists = await Vacancy.exists({ _id: vacancyId });
    isVacancyExists.should.to.equal(false);
  });
});
