const {
  connect,
  populate,
  populateAll,
  clear,
  close,
} = require("../utils/db.mock");
const chai = require("chai");
const User = require("../../models/user");
const Job = require("../../models/job");
const SearchParams = require("../../models/searchParams");
const Vacancy = require("../../models/vacancy");

/* Config chai */
chai.should();

/* Application user in database */
let savedUser;

const user = {
  username: "name",
  password: "password",
};

let savedJobs;

const jobs = [{ name: "job name" }, { name: "job2 name" }];

const params = [
  {
    country: "Japan",
    cityName: "Tokio",
    keyWords: "Java Developer",
  },
  {
    country: "Great Britain",
    cityName: "London",
    keyWords: "JS Developer",
  },
];

const vacancies = [
  {
    vacancyId: "1",
    name: "JS junior developer",
    date: "2020-05-23T12:01:00.533",
    companyName: "super cool company",
    shortDescription: "it's a really great job",
  },
  {
    vacancyId: "2",
    name: "vacancy name",
    date: "2020-05-27T12:01:00.533",
    companyName: "even more cool company",
    shortDescription: "short vacancy description",
  },
];

describe("JOB SCHEMA TEST", () => {
  beforeEach(async () => {
    await connect();
    savedUser = await populate(user, User);
    savedJobs = await populateAll(jobs, Job, { userId: savedUser._id });
    await populate(params[0], SearchParams, {
      jobId: savedJobs[0]._id,
    });
    await populate(params[1], SearchParams, {
      jobId: savedJobs[1]._id,
    });
    await populate(vacancies[0], Vacancy, {
      jobId: savedJobs[0]._id,
    });
    await populate(vacancies[1], Vacancy, {
      jobId: savedJobs[1]._id,
    });
  });

  afterEach(async () => {
    await clear();
    await close();
  });

  it("should remove all vacancies belong to the removed job", async () => {
    const jobId = savedJobs[0]._id;

    const jobShouldExists = await Job.exists({ _id: jobId });
    jobShouldExists.should.to.equal(true);

    const vacancyShouldExists = await Vacancy.exists({ jobId: jobId });
    vacancyShouldExists.should.to.equal(true);

    await Job.deleteOne({ _id: jobId });

    const jobShouldBeDeleted = await Job.exists({ _id: jobId });
    jobShouldBeDeleted.should.to.equal(false);

    const vacancyShouldBeDeleted = await Vacancy.exists({ jobId: jobId });
    vacancyShouldBeDeleted.should.to.equal(false);
  });

  it("should remove search parameters belong to the job", async () => {
    const jobId = savedJobs[0]._id;

    const jobShouldExists = await Job.exists({ _id: jobId });
    jobShouldExists.should.to.equal(true);

    const paramsShouldExists = await SearchParams.exists({ jobId: jobId });
    paramsShouldExists.should.to.equal(true);

    await Job.deleteOne({ _id: jobId });

    const jobShouldBeDeleted = await Job.exists({ _id: jobId });
    jobShouldBeDeleted.should.to.equal(false);

    const paramsShouldBeDeleted = await SearchParams.exists({ jobId: jobId });
    paramsShouldBeDeleted.should.to.equal(false);
  });
});
