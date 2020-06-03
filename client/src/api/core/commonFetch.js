import { ERROR, SUCCESS } from "../../models/alertTypes";

import Alert from "../../models/alert";
import { setSystemAlert } from "../../actions";

const alertSuccess = new Alert("operation successfully done", SUCCESS);
const systemAlertSuccess = setSystemAlert(alertSuccess);

const alertError = new Alert("can't interact with server", ERROR);
const systemAlertError = setSystemAlert(alertError);

/**
 * Make fetch request and dispatch redux action.
 * In addition method automatically emits system alerts:
 *  if fetch successful dispatch system alert success
 *  if fetch unsuccessful dispatch system alert error
 *
 * @param request Fetch request object.
 * @param action Redux action.
 */
export const fetchWithAction = (request, action) => {
  return (dispatch) => {
    fetch(request)
      .then(() => {
        dispatch(action);
        dispatch(systemAlertSuccess);
      })
      .catch(() => {
        dispatch(systemAlertError);
      });
  };
};

/**
 * Make fetch request and dispatch redux action with fetched data.
 * In addition method automatically emits system alerts:
 *  if fetch successful dispatch system alert success
 *  if fetch unsuccessful dispatch system alert error
 *
 * @param request Fetch request object.
 * @param actionFn Redux action function.
 * @param mapper Mapper from js object to model.
 */
export const fetchWithActionFn = (request, actionFn, mapper) => {
  return (dispatch) => {
    fetch(request)
      .then((res) => res.json())
      .then((json) => {
        const payload = Array.isArray(json) ? json.map(mapper) : mapper(json);
        dispatch(actionFn(payload));
      })
      .catch(() => {
        dispatch(systemAlertError);
      });
  };
};
