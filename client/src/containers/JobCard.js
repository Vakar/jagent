import {
  cleanFoundVacancies,
  cleanSavedVacancies,
  selectJob,
} from "../actions";

import JobCard from "../components/JobCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeJob } from "../api/jobs";

const setJob = (job) => {
  return (dispatch) => {
    const action = selectJob(job);
    dispatch(action);
  };
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    deleteJob: removeJob,
    setJob: setJob,
    cleanFoundVacancies: cleanFoundVacancies,
    cleanSavedVacancies: cleanSavedVacancies,
  };
  return bindActionCreators(props, dispatch);
};

export default connect(null, mapDispatchToProps)(JobCard);
