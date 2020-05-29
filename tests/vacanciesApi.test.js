const dbMock = require("./utils/db.mock");
const app = require("../app");
const chai = require("chai");
const Vacancy = require("../models/vacancy");
const bcrypt = require("bcrypt");
const session = require("supertest-session");
const { HTTP_OK, HTTP_FOUND } = require("../constants/httpCodes");
const { newUser, newJob } = require("../models/modelFactory");
const { credentials, apiRoot } = require("./utils/testConstants");
const { docToObj } = require("./utils/mongooseUtil");

/* Config chai */
chai.should();

const API_PATH = `${apiRoot}/jobs/:jobId/vacancies`;

/* Application user in database */
let user;

/* User jobs */
let job;

/* Array of user vacancies */
let vacancies;

/* Populate users database collection */
const populateUsers = async () => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const doc = await newUser(credentials.username, pswdHash).save();
  user = docToObj(doc);
};

/* Populate jobs database collection */
const populateJobs = async () => {
  const model = newJob(user._id, "job name");
  const doc = await model.save();
  const obj = docToObj(doc);
  job = obj;
};

/* Vacancy template */
const vacancyTmp = {
  vacancyId: "1",
  name: "vacancy name",
  date: "2020-05-27T12:01:00.533",
  companyName: "company name",
  shortDescription: "short vacancy description",
};

/* Populate vacancies database collection */
const populateVacancies = async () => {
  const tmp = { jobId: job._id };
  Object.assign(tmp, vacancyTmp);
  const vacancy = new Vacancy(tmp);
  const doc = await vacancy.save();
  const obj = docToObj(doc);
  vacancies = [obj];
};

/* Authorized session for api testing */
let authorizedSession;

/* Authorize in system */
const authorize = async () => {
  try {
    const testSession = session(app);
    await testSession.post("/login").send(credentials).expect(HTTP_FOUND);
    authorizedSession = testSession;
  } catch (err) {
    throw new Error(err.message);
  }
};

describe("VACANCY CONTROLLER TEST", () => {
  beforeEach(async () => {
    await dbMock.connect();
    await populateUsers();
    await populateJobs();
    await populateVacancies();
    await authorize();
  });

  afterEach(async () => {
    await dbMock.clear();
    await dbMock.close();
  });

  it(`GET: ${API_PATH} | get vacancies belong to job`, (done) => {
    authorizedSession
      .get(`${apiRoot}/jobs/${job._id}/vacancies`)
      .expect((res) => {
        res.body.should.to.deep.equal(vacancies);
      })
      .expect(HTTP_OK, done);
  });

  it(`POST: ${API_PATH} | save vacancy to database`, async () => {
    const tmp = Object.assign({}, vacancyTmp);
    tmp.vacancyId = "2";
    await authorizedSession
      .post(`${apiRoot}/jobs/${job._id}/vacancies`)
      .send(tmp)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const docs = await Vacancy.find({
      vacancyId: tmp.vacancyId,
    });
    docs.length.should.to.equal(1);
  });

  it(`POST: ${API_PATH} | return saved vacancy as json`, (done) => {
    const tmp = Object.assign({}, vacancyTmp);
    tmp.vacancyId = "2";
    tmp.name = "new vacancy";
    tmp.date = new Date("2020-05-27T12:01:00.533");
    authorizedSession
      .post(`${apiRoot}/jobs/${job._id}/vacancies`)
      .send(tmp)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        tmp.jobId = job._id;
        tmp.date = tmp.date.toISOString();
        res.body.should.to.include(tmp);
      })
      .expect(HTTP_OK, done);
  });

  it(`DELETE: ${API_PATH}/:vacancyId | delete from db by _id`, async () => {
    const vacancyId = vacancies[0]._id;
    await authorizedSession
      .delete(`${apiRoot}/jobs/${job._id}/vacancies/${vacancyId}`)
      .expect(HTTP_OK);
    const isVacancyExists = await Vacancy.exists({ _id: vacancyId });
    isVacancyExists.should.to.equal(false);
  });
});
