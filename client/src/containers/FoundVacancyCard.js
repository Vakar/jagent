import FoundVacancyCard from "../components/FoundVacancyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openVacancyPage } from "../api/rabotaUa";
import { saveVacancy } from "../api/vacancies";

const mapStateToProps = (state) => {
  return {
    jobId: state.job.selectedJob.id,
    savedVacancies: state.job.savedVacancies,
  };
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    saveVacancy: saveVacancy,
    openVacancyPage: openVacancyPage,
  };
  return bindActionCreators(props, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundVacancyCard);
