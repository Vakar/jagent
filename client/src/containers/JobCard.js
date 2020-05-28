import JobCard from "../components/JobCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeJob } from "../api/jobs";

const mapDispatchToProps = (dispatch) => {
  const props = {
    deleteJobs: removeJob,
  };
  return bindActionCreators(props, dispatch);
};

export default connect(null, mapDispatchToProps)(JobCard);
