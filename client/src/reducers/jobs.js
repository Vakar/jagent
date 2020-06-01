import { ADD_JOB, DELETE_JOB, EDIT_JOB, GET_JOBS } from "../actions/types";

import produce from "immer";

const initialState = {
  selectedJob: null,
  jobs: [],
};

export default function jobs(baseState = initialState, action) {
  switch (action.type) {
    case ADD_JOB:
      return produce(baseState, (draftState) => {
        draftState.jobs.push(action.job);
      });
    case DELETE_JOB:
      return produce(baseState, (draftState) => {
        if (draftState.selectedJob) {
          draftState.selectedJob =
            draftState.selectedJob.id === action.id
              ? undefined
              : draftState.selectedJob;
        }
        draftState.jobs = draftState.jobs.filter((e) => e.id !== action.id);
      });
    case EDIT_JOB:
      return produce(baseState, (draftState) => {
        draftState.selectedJob =
          draftState.selectedJob.id === action.job.id
            ? action.job
            : draftState.selectedJob;
        draftState.jobs = draftState.jobs.map((e) =>
          e.id === action.job.id ? action.job : e
        );
      });
    case GET_JOBS:
      return produce(baseState, (draftState) => {
        draftState.jobs = action.jobs;
      });
    default:
      return baseState;
  }
}
