import FoundVacancyCard from "../components/FoundVacancyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveVacancy } from "../api/vacancies";

const mapStateToProps = (state) => {
  return {
    jobId: state.job.selectedJob.id,
    savedVacancies: state.job.savedVacancies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveVacancy: saveVacancy }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundVacancyCard);
