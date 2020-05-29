const dbMock = require("./utils/db.mock");
const app = require("../app");
const chai = require("chai");
const Job = require("../models/job");
const bcrypt = require("bcrypt");
const session = require("supertest-session");
const { HTTP_OK, HTTP_FOUND } = require("../constants/httpCodes");
const { newUser, newJob } = require("../models/modelFactory");
const { credentials, apiRoot } = require("./utils/testConstants");
const { docToObj } = require("./utils/mongooseUtil");

/* Config chai */
chai.should();

const API_PATH = `${apiRoot}/jobs`;

/* Application user in database */
let user;
let appUser;

/*
 * Array of saved to database job objects
 * that belong to the authorized users.
 */
let userJobs;

/* Populate users database collection */
const populateUsers = async () => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const doc = await newUser("name", pswdHash).save();
  const doc2 = await newUser(credentials.username, pswdHash).save();
  user = docToObj(doc);
  appUser = docToObj(doc2);
};

/* Populate jobs database collection */
const populateJobs = async () => {
  const doc = await newJob(appUser._id, "job").save();
  const doc2 = await newJob(appUser._id, "job2").save();
  await newJob(user._id, "job3").save();
  const obj = docToObj(doc);
  const obj2 = docToObj(doc2);
  userJobs = [obj, obj2];
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

describe("JOB CONTROLLER TEST", () => {
  beforeEach(async () => {
    await dbMock.connect();
    await populateUsers();
    await populateJobs();
    await authorize();
  });

  afterEach(async () => {
    await dbMock.clear();
    await dbMock.close();
  });

  it(`GET: ${API_PATH} | get jobs belong to authorized user`, (done) => {
    authorizedSession
      .get(API_PATH)
      .expect((res) => {
        res.body.should.to.deep.equal(userJobs);
      })
      .expect(HTTP_OK, done);
  });

  it(`GET: ${API_PATH} | get job from database by id`, (done) => {
    authorizedSession
      .get(`${API_PATH}/${userJobs[0]._id}`)
      .expect((res) => {
        res.body.should.to.eql(userJobs[0]);
      })
      .expect(HTTP_OK, done);
  });

  it(`POST: ${API_PATH} | save job to database`, async () => {
    const jobName = "newJob";
    await authorizedSession
      .post(API_PATH)
      .send({ name: jobName })
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const docs = await Job.find({
      name: jobName,
    });
    docs.length.should.to.equal(1);
  });

  it(`POST: ${API_PATH} | return saved job as json`, (done) => {
    const jobName = "newJob";
    authorizedSession
      .post(API_PATH)
      .send({ userId: appUser._id, name: jobName })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.should.to.include({ userId: appUser._id, name: jobName });
      })
      .expect(HTTP_OK, done);
  });

  it(`PUT: ${API_PATH} | update job in database`, async () => {
    const job = userJobs[0];
    job.name = "new job name";
    await authorizedSession
      .put(API_PATH)
      .send(job)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const doc = await Job.findById(job._id);
    const updatedJob = docToObj(doc);
    updatedJob.should.to.include(job);
  });

  it(`PUT: ${API_PATH} | return updated job as json`, (done) => {
    const job = userJobs[0];
    job.name = "new job name";
    authorizedSession
      .put(API_PATH)
      .send(job)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.should.to.include(job);
      })
      .expect(HTTP_OK, done);
  });

  it(`DELETE: ${API_PATH} | delete job by id from database`, async () => {
    const jobId = userJobs[0]._id;
    await authorizedSession.delete(`${API_PATH}/${jobId}`).expect(HTTP_OK);
    const isJobExists = await Job.exists({ _id: jobId });
    isJobExists.should.to.equal(false);
  });
});
