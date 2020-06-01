import { addJob, deleteJob, editJob } from "../actions";

import Job from "../models/job";
import chai from "chai";
import jobs from "./jobs";

chai.should();

let defaultJob;
let newJob;

let initialState;
let fullState;

describe("jobs reducer", () => {
  beforeEach(() => {
    defaultJob = new Job("5e93293ddd39d295dae546b1", "default_job");
    newJob = new Job("5ebd5eb9b7dd175ce77e904a", "job_name");
    initialState = {
      selectedJob: null,
      jobs: [],
    };
    fullState = {
      selectedJob: defaultJob,
      jobs: [defaultJob, newJob],
    };
  });

  it("should handle initial state", () => {
    jobs(undefined, {}).should.to.deep.equal(initialState);
  });

  it("ADD_JOB | should add job to jobs array ", () => {
    const addAction = addJob(newJob);
    jobs(initialState, addAction).should.to.deep.equal({
      selectedJob: null,
      jobs: [newJob],
    });
  });

  it("DELETE_JOB | should delete job from jobs array", () => {
    const deleteAction = deleteJob(defaultJob.id);
    jobs(fullState, deleteAction).should.to.deep.include({
      jobs: [newJob],
    });
  });

  it("DELETE_JOB | should delete job from selected if it selected", () => {
    const deleteAction = deleteJob(defaultJob.id);
    jobs(fullState, deleteAction).should.to.deep.include({
      selectedJob: undefined,
    });
  });

  it("DELETE_JOB | shouldn't delete job from selected if it's not selected", () => {
    const deleteAction = deleteJob(defaultJob.id);
    fullState.selectedJob = newJob;
    jobs(fullState, deleteAction).should.to.deep.include({
      selectedJob: newJob,
    });
  });

  it("EDIT_JOB | should update job in array", () => {
    const updatedJob = new Job(defaultJob.id, "new_job_name");
    const editAction = editJob(updatedJob);
    jobs(fullState, editAction).should.to.deep.include({
      jobs: [updatedJob, newJob],
    });
  });

  it("EDIT_JOB | shouldn't update selected job if it's not selected", () => {
    const updatedJob = new Job(newJob.id, "new_job_name");
    const editAction = editJob(updatedJob);
    jobs(fullState, editAction).should.to.deep.include({
      selectedJob: defaultJob,
    });
  });

  it("EDIT_JOB | should update selected job if it's selected", () => {
    const updatedJob = new Job(defaultJob.id, "new_job_name");
    const editAction = editJob(updatedJob);
    jobs(fullState, editAction).should.to.deep.include({
      selectedJob: updatedJob,
    });
  });
});
