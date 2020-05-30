const { connect, populate, clear, close } = require("../utils/db.mock");
const chai = require("chai");
const SearchParams = require("../../models/searchParams");
const bcrypt = require("bcrypt");
const { HTTP_OK } = require("../../constants/httpCodes");
const { credentials, apiRoot } = require("../utils/testConstants");
const { docToObj } = require("../utils/mongooseUtil");
const { authorize } = require("../utils/authorizeSession");
const User = require("../../models/user");
const Job = require("../../models/job");

/* Config chai */
chai.should();

/** Search params api path. */
const API_PATH = `${apiRoot}/jobs/:jobId/searchParams`;

/** Authorized session for api testing. */
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

/* SEARCH PARAMS COLLECTION CONFIGURATION | START */

/** Search params array. */
const searchParams = [
  {
    country: "Ukraine",
    cityName: "Kharkiv",
    keyWords: "JS Junior Developer",
  },
  {
    country: "Great Britain",
    cityName: "London",
    keyWords: "JS dev",
  },
];

/** Saved job search parameters. */
let savedSearchParams;

/* SEARCH PARAMS COLLECTION CONFIGURATION | END */

describe("SEARCH PARAMS CONTROLLER TEST", () => {
  beforeEach(async () => {
    await connect();
    savedUser = await populateUser(user);
    const jobPayload = { userId: savedUser._id };
    savedJob = await populate(job, Job, jobPayload);
    const paramsPayload = { jobId: savedJob._id };
    savedSearchParams = await populate(
      searchParams[0],
      SearchParams,
      paramsPayload
    );
    authorizedSession = await authorize();
  });

  afterEach(async () => {
    await clear();
    await close();
  });

  it(`GET: ${API_PATH} | get search params by job id`, (done) => {
    authorizedSession
      .get(`${apiRoot}/jobs/${savedJob._id}/searchParams`)
      .expect((res) => {
        res.body.should.to.deep.equal(savedSearchParams);
      })
      .expect(HTTP_OK, done);
  });

  it(`POST: ${API_PATH} | should clean params before save`, async () => {
    const params = Object.assign({}, searchParams[1]);
    await authorizedSession
      .post(`${apiRoot}/jobs/${savedJob._id}/searchParams`)
      .send(params)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const docs = await SearchParams.find({ jobId: savedJob._id });
    docs.length.should.to.equal(1);
  });

  it(`POST: ${API_PATH} | should params properly`, async () => {
    const params = Object.assign({}, searchParams[1]);
    await authorizedSession
      .post(`${apiRoot}/jobs/${savedJob._id}/searchParams`)
      .send(params)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const doc = await SearchParams.findOne({ jobId: savedJob._id });
    const obj = docToObj(doc);
    obj.should.to.include(params);
  });

  it(`POST: ${API_PATH} | should remove params`, async () => {
    await authorizedSession
      .delete(`${apiRoot}/jobs/${savedJob._id}/searchParams`)
      .expect(HTTP_OK);
    const isSearchParamsExists = await SearchParams.exists({
      jobId: savedJob._id,
    });
    isSearchParamsExists.should.to.equal(false);
  });
});
