import AutocompleteSelect from "../components/AutocompleteSelect";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCity } from "../actions";

const mapStateToProps = (state) => {
  return {
    cities: state.job.cities,
    selectedCity: state.job.selectedCity,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCity: setCity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteSelect);
