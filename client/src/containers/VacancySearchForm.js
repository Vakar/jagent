import VacancySearchForm from "../components/VacancySearchForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchVacancies } from "../api/rabotaUa";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ searchVacancies: fetchVacancies }, dispatch);

export default connect(null, mapDispatchToProps)(VacancySearchForm);
