import SavedVacancyCard from "../components/SavedVacancyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openVacancyPage } from "../api/rabotaUa";
import { removeVacancy } from "../api/vacancies";

const mapStateToProps = (state) => {
  return {
    jobId: state.job.selectedJob._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    removeVacancy: removeVacancy,
    openVacancyPage: openVacancyPage,
  };
  return bindActionCreators(props, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedVacancyCard);
