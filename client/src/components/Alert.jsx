import { ERROR, INFO, SUCCESS, WARNING } from "../models/alertTypes";

import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import React from "react";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

Alert.propTypes = {
  severity: PropTypes.oneOf([ERROR, WARNING, INFO, SUCCESS]),
  onClose: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Alert;
