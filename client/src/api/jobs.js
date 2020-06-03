import { addJob, deleteJob, getJobs } from "../actions";
import { fetchWithAction, fetchWithActionFn } from "./core/commonFetch";

import Job from "../models/job";
import apiRouts from "./apiRouts";

const JOBS_URL = apiRouts.jobs();

const mapper = (e) => new Job(e._id, e.name);

export const fetchJobs = () => {
  const request = new Request(JOBS_URL);
  return fetchWithActionFn(request, getJobs, mapper);
};

export const saveJob = (name) => {
  const request = new Request(JOBS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
  return fetchWithActionFn(request, addJob, mapper);
};

export const removeJob = (id) => {
  const url = apiRouts.jobsWithId(id);
  const request = new Request(url, { method: "DELETE" });
  const action = deleteJob(id);
  return fetchWithAction(request, action);
};
