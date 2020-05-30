const {
  connect,
  populate,
  populateAll,
  clear,
  close,
} = require("../utils/db.mock");
const chai = require("chai");
const Job = require("../../models/job");
const bcrypt = require("bcrypt");
const { HTTP_OK } = require("../../constants/httpCodes");
const { credentials, apiRoot } = require("../utils/testConstants");
const { docToObj } = require("../utils/mongooseUtil");
const { authorize } = require("../utils/authorizeSession");
const User = require("../../models/user");

/* Config chai */
chai.should();

/** Jobs api path. */
const API_PATH = `${apiRoot}/jobs`;

/** Authorized session for api testing. */
let authorizedSession;

/* USERS COLLECTION CONFIGURATION | START */

/** Users for saving to database. */
const users = [{ username: "name" }, { username: "user" }];

/** Application user in database. */
let savedUser;

/** Application user in database for authorization. */
let savedAuthUser;

/** Populate users database collection. */
const populateUsers = async (userArr) => {
  const pswdHash = await bcrypt.hash(credentials.password, 10);
  const payload = { password: pswdHash };
  savedUser = await populate(userArr[0], User, payload);
  savedAuthUser = await populate(userArr[1], User, payload);
};

/* USERS COLLECTION CONFIGURATION | END */

/* JOBS COLLECTION CONFIGURATION | START */

/** Array of jobs for saving in database. */
const jobs = [
  {
    name: "job",
  },
  {
    name: "job2",
  },
  {
    name: "job3",
  },
];

/**
 * Array of saved to database job objects
 * that belong to the authorized users.
 */
let authorizedUserJobs;

/**
 * Populate jobs database collection.
 * @param jobsArr
 */
const populateJobs = async (jobsArr) => {
  authorizedUserJobs = await populateAll([jobsArr[0], jobsArr[1]], Job, {
    userId: savedAuthUser._id,
  });
  await populate(jobsArr[2], Job, { userId: savedUser._id });
};

/* JOBS COLLECTION CONFIGURATION | END */

describe("JOB CONTROLLER TEST", () => {
  beforeEach(async () => {
    await connect();
    await populateUsers(users);
    await populateJobs(jobs);
    authorizedSession = await authorize();
  });

  afterEach(async () => {
    await clear();
    await close();
  });

  it(`GET: ${API_PATH} | get jobs belong to authorized user`, (done) => {
    authorizedSession
      .get(API_PATH)
      .expect((res) => {
        res.body.should.to.deep.equal(authorizedUserJobs);
      })
      .expect(HTTP_OK, done);
  });

  it(`GET: ${API_PATH} | get job from database by id`, (done) => {
    authorizedSession
      .get(`${API_PATH}/${authorizedUserJobs[0]._id}`)
      .expect((res) => {
        res.body.should.to.eql(authorizedUserJobs[0]);
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
      .send({ userId: savedAuthUser._id, name: jobName })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.should.to.include({
          userId: savedAuthUser._id,
          name: jobName,
        });
      })
      .expect(HTTP_OK, done);
  });

  it(`PUT: ${API_PATH} | update job in database`, async () => {
    const job = authorizedUserJobs[0];
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
    const job = authorizedUserJobs[0];
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
    const jobId = authorizedUserJobs[0]._id;
    await authorizedSession.delete(`${API_PATH}/${jobId}`).expect(HTTP_OK);
    const isJobExists = await Job.exists({ _id: jobId });
    isJobExists.should.to.equal(false);
  });
});
