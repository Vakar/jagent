import VacancySearchForm from "../components/VacancySearchForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchCities } from "../api/rabotaUa";
import { fetchVacancies } from "../api/rabotaUa";

const mapStateToProps = (state) => {
  return {
    selectedCity: state.job.selectedCity,
  };
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    fetchCities: fetchCities,
    searchVacancies: fetchVacancies,
  };
  return bindActionCreators(props, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VacancySearchForm);
