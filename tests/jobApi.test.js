const dbMock = require("./db.mock");
const app = require("../app");
const chai = require("chai");
const Job = require("../models/job");
const bcrypt = require("bcrypt");
const session = require("supertest-session");
const { HTTP_OK, HTTP_FOUND } = require("../constants/httpCodes");
const { newUser, newJob } = require("../models/modelFactory");
const { credentials } = require("./testConstants");

/* Config chai */
chai.should();

const API_PATH = "/api/rest/jobs";

/* Convert mongoose document to plain JS object */
const documentToObject = (doc) => {
  const json = JSON.stringify(doc.toObject());
  return JSON.parse(json);
};

/* Application user in database */
let user;
let appUser;

/*
 * Array of saved to database job objects
 * that belong to the authorized users.
 */
let userCompanies;

/* Populate users database collection */
const populateUsers = async () => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const doc1 = await newUser("name", pswdHash).save();
  const doc2 = await newUser(credentials.username, pswdHash).save();
  user = documentToObject(doc1);
  appUser = documentToObject(doc2);
};

/* Populate jobs database collection */
const populateCompanies = async () => {
  const job1 = newJob(appUser._id, "job1");
  const job2 = newJob(appUser._id, "job2");
  await newJob(user._id, "job3").save();
  const job1Doc = await job1.save();
  const job2Doc = await job2.save();
  const job1Obj = documentToObject(job1Doc);
  const job2Obj = documentToObject(job2Doc);
  userCompanies = [job1Obj, job2Obj];
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

describe("COMPANY CONTROLLER TEST", () => {
  beforeEach(async () => {
    await dbMock.connect();
    await populateUsers();
    await populateCompanies();
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
        res.body.should.to.deep.equal(userCompanies);
      })
      .expect(HTTP_OK, done);
  });

  it(`GET: ${API_PATH} | get job from database by id`, (done) => {
    authorizedSession
      .get(`${API_PATH}/${userCompanies[0]._id}`)
      .expect((res) => {
        res.body.should.to.eql(userCompanies[0]);
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
    const job = documentToObject(docs[0]);
    job.should.to.include({ userId: appUser._id, name: jobName });
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
    const job = userCompanies[0];
    const newJobName = "new job name";
    job.name = newJobName;
    await authorizedSession
      .put(API_PATH)
      .send(job)
      .set("Accept", "application/json")
      .expect(HTTP_OK);
    const doc = await Job.findById(job._id);
    const updatedJob = documentToObject(doc);
    updatedJob.should.to.include(job);
  });

  it(`PUT: ${API_PATH} | return updated job as json`, (done) => {
    const job = userCompanies[0];
    const newJobName = "new job name";
    job.name = newJobName;
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
    const jobId = userCompanies[0]._id;
    await authorizedSession.delete(`${API_PATH}/${jobId}`).expect(HTTP_OK);
    const isJobExists = await Job.exists({ _id: jobId });
    isJobExists.should.to.equal(false);
  });
});
