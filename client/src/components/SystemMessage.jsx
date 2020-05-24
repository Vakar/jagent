import Alert from "./Alert";
import AlertModel from "../models/alert";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
function SystemMessage({ alert, removeAlert }) {
  React.useState({
    open: false,
    Transition: Fade,
  });

  const handleClose = () => {
    removeAlert();
  };

  if (alert) {
    return (
      <Snackbar open autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={alert.severity} onClose={handleClose}>
          {alert.message}
        </Alert>
      </Snackbar>
    );
  } else {
    return <div className="empty"></div>;
  }
}

SystemMessage.propTypes = {
  alert: PropTypes.instanceOf(AlertModel),
  removeAlert: PropTypes.func.isRequired,
};

export default SystemMessage;
