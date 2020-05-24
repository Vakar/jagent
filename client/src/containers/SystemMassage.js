import SystemMessage from "../components/SystemMessage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeSystemAlert } from "../actions";

const mapStateToProps = (state) => {
  return {
    alert: state.system.alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  const props = {
    removeAlert: removeSystemAlert,
  };
  return bindActionCreators(props, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemMessage);
