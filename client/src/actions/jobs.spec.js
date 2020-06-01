import * as actions from "./jobs";

import { ADD_JOB, DELETE_JOB, EDIT_JOB, GET_JOBS } from "./types";

import Job from "../models/job";
import chai from "chai";

chai.should();

const job = new Job("5ebd5eb9b7dd175ce77e904a", "job_name");
const job2 = new Job("5ebd5eb9b7gd175ce77e904a", "job2_name");
const jobs = [job, job2];

describe("job actions", () => {
  it("addJob should create ADD_JOB action", () => {
    actions.addJob(job).should.to.deep.equal({
      type: ADD_JOB,
      job: job,
    });
  });

  it("deleteJob should create DELETE_JOB action", () => {
    actions.deleteJob(job.id).should.to.deep.equal({
      type: DELETE_JOB,
      id: job.id,
    });
  });

  it("editJob should create EDIT_JOB action", () => {
    actions.editJob(job).should.to.deep.equal({
      type: EDIT_JOB,
      job: job,
    });
  });

  it("getJobs should create GET_JOBS action", () => {
    actions.getJobs(jobs).should.to.deep.equal({
      type: GET_JOBS,
      jobs: jobs,
    });
  });
});
