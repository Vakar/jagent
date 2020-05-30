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

/* Config chai */
chai.should();

/* Application user in database */
let savedUsers;

const users = [
  {
    username: "name",
    password: "password",
  },
  {
    username: "name2",
    password: "password2",
  },
];

const jobs = [{ name: "job name" }, { name: "job2 name" }];

describe("USER SCHEMA TEST", () => {
  beforeEach(async () => {
    await connect();
    savedUsers = await populateAll(users, User);
    await populate(jobs[0], Job, { userId: savedUsers[0]._id });
    await populate(jobs[1], Job, { userId: savedUsers[1]._id });
  });

  afterEach(async () => {
    await clear();
    await close();
  });

  it("should remove all jobs belong to the removed user", async () => {
    const userId = savedUsers[0]._id;

    const userShouldExists = await User.exists({ _id: userId });
    userShouldExists.should.to.equal(true);

    const jobShouldExists = await Job.exists({ userId: userId });
    jobShouldExists.should.to.equal(true);

    await User.deleteOne({ _id: userId });

    const userShouldBeDeleted = await User.exists({ _id: userId });
    userShouldBeDeleted.should.to.equal(false);

    const jobShouldBeDeleted = await Job.exists({ userId: userId });
    jobShouldBeDeleted.should.to.equal(false);
  });
});
