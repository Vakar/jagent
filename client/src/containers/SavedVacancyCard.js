import SavedVacancyCard from "../components/SavedVacancyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeVacancy } from "../api/vacancies";

const mapStateToProps = (state) => {
  return {
    jobId: state.job.selectedJob.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeVacancy: removeVacancy }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedVacancyCard);
