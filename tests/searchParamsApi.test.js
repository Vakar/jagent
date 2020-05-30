const dbMock = require("./utils/db.mock");
const app = require("../app");
const chai = require("chai");
const SearchParams = require("../models/searchParams");
const bcrypt = require("bcrypt");
const session = require("supertest-session");
const { HTTP_OK, HTTP_FOUND } = require("../constants/httpCodes");
const { newUser, newJob } = require("../models/modelFactory");
const { credentials, apiRoot } = require("./utils/testConstants");
const { docToObj } = require("./utils/mongooseUtil");

/* Config chai */
chai.should();

const API_PATH = `${apiRoot}/jobs/:jobId/searchParams`;

/* Application user in database */
let user;

/* Populate users database collection */
const populateUsers = async () => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const doc = await newUser(credentials.username, pswdHash).save();
  user = docToObj(doc);
};

/* User jobs */
let job;

/* Populate jobs database collection */
const populateJobs = async () => {
  const model = newJob(user._id, "job name");
  const doc = await model.save();
  const obj = docToObj(doc);
  job = obj;
};

/* Search params templates */
const searchParamsTmp = {
  country: "Ukraine",
  cityName: "Kharkiv",
  keyWords: "JS Junior Developer",
};

const searchParamsTmp2 = {
  country: "Great Britain",
  cityName: "London",
  keyWords: "JS dev",
};

/* Job search parameters */
let searchParams;

/* Populate job search params  database collection */
const populateSearchParams = async () => {
  const tmp = { jobId: job._id };
  Object.assign(tmp, searchParamsTmp);
  const params = new SearchParams(tmp);
  const doc = await params.save();
  const obj = docToObj(doc);
  searchParams = obj;
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

describe("SEARCH PARAMS CONTROLLER TEST", () => {
  beforeEach(async () => {
    await dbMock.connect();
    await populateUsers();
    await populateJobs();
    await populateSearchParams();
    await authorize();
  });

  afterEach(async () => {
    await dbMock.clear();
    await dbMock.close();
  });

  it(`GET: ${API_PATH} | get search params by job id`, (done) => {
    authorizedSession
      .get(`${apiRoot}/jobs/${job._id}/searchParams`)
      .expect((res) => {
        res.body.should.to.deep.equal(searchParams);
      })
      .expect(HTTP_OK, done);
  });

  it(`POST: ${API_PATH} | should clean params before save`, async () => {
    const params = Object.assign({}, searchParamsTmp2);
    await authorizedSession
      .post(`${apiRoot}/jobs/${job._id}/searchParams`)
      .send(params)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const docs = await SearchParams.find({ jobId: job._id });
    docs.length.should.to.equal(1);
  });

  it(`POST: ${API_PATH} | should params properly`, async () => {
    const params = Object.assign({}, searchParamsTmp2);
    await authorizedSession
      .post(`${apiRoot}/jobs/${job._id}/searchParams`)
      .send(params)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const doc = await SearchParams.findOne({ jobId: job._id });
    const obj = docToObj(doc);
    obj.should.to.include(params);
  });

  it(`POST: ${API_PATH} | should remove params`, async () => {
    await authorizedSession
      .delete(`${apiRoot}/jobs/${job._id}/searchParams`)
      .expect(HTTP_OK);
    const isSearchParamsExists = await SearchParams.exists({ jobId: job._id });
    isSearchParamsExists.should.to.equal(false);
  });
});
