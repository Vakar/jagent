import { fetchJobs, removeJob, saveJob } from "./jobs";

import apiRouts from "./apiRouts";

/* Model data */
const jobId = "5e93293ddd39d295dae546b1";
const jobName = "job name";

/* API URLs */
const JOBS_URL = apiRouts.jobs();
const JOBS_WITH_ID = apiRouts.jobsWithId(jobId);

/* Request info objects */
const post = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: jobName,
  }),
};

const GET_REQUEST = new Request(JOBS_URL);
const POST_REQUEST = new Request(JOBS_URL, post);
const DELETE_REQUEST = new Request(JOBS_WITH_ID, { method: "DELETE" });

/* Mocks */
const mockSuccessResponse = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });

const dispatchFn = jest.fn();

describe("Jobs API Client Test", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it(`FETCH: should use correct url & request info object 
    when fetching jobs from server`, () => {
    const fn = fetchJobs(jobId);
    fn(dispatchFn);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(GET_REQUEST);
  });

  it(`SAVE: should use correct url & request info object 
  when saving job to server`, () => {
    const fn = saveJob(jobName);
    fn(dispatchFn);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(POST_REQUEST);
  });

  it(`DELETE: should use correct url & request info object 
    when deleting job from server`, () => {
    const fn = removeJob(jobId);
    fn(dispatchFn);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(DELETE_REQUEST);
  });
});
