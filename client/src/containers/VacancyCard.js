import VacancyCard from "../components/VacancyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeVacancy } from "../api/vacancies";

const mapDispatchToProps = (dispatch) => {
  const props = {
    deleteVacancy: removeVacancy,
  };
  return bindActionCreators(props, dispatch);
};

export default connect(null, mapDispatchToProps)(VacancyCard);
