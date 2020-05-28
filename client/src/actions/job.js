import { ADD_JOB, DELETE_JOB, EDIT_JOB, GET_JOBS } from "./types";

export const addJob = (job) => ({ type: ADD_JOB, job });
export const deleteJob = (id) => ({ type: DELETE_JOB, id });
export const editJob = (job) => ({ type: EDIT_JOB, job });
export const getJobs = (jobs) => ({ type: GET_JOBS, jobs });
