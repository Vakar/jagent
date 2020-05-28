import { ERROR, SUCCESS } from "../models/alertTypes";
import { addJob, deleteJob, getJobs, setSystemAlert } from "../actions";

import API from "./apiRouts";
import Alert from "../models/alert";
import Job from "../models/job";

export const fetchJobs = () => {
  const url = API.jobs();
  return (dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        const jobs = res.map((e) => new Job(e._id, e.name));
        dispatch(getJobs(jobs));
        return res;
      })
      .catch(() => {
        dispatch(
          setSystemAlert(new Alert("can't load jobs from server", ERROR))
        );
      });
  };
};

export const removeJob = (id) => {
  const url = API.deleteJob(id);
  return (dispatch) => {
    fetch(url, { method: "DELETE" })
      .then(() => {
        dispatch(deleteJob(id));
        dispatch(setSystemAlert(new Alert("successfully remove job"), SUCCESS));
      })
      .catch(() => {
        dispatch(
          setSystemAlert(new Alert("can't remove job from server", ERROR))
        );
      });
  };
};

export const saveJob = (name) => {
  return (dispatch) => {
    fetch(API.jobs(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => {
        const json = res.json();
        return json;
      })
      .then((res) => {
        const savedJob = new Job(res._id, res.name);
        dispatch(addJob(savedJob));
        dispatch(setSystemAlert(new Alert("successfully save job"), SUCCESS));
      })
      .catch(() => {
        dispatch(setSystemAlert(new Alert("can't save job", ERROR)));
      });
  };
};
