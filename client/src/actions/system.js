import { REMOVE_SYSTEM_ALERT, SET_SYSTEM_ALERT } from "./types";

export const setSystemAlert = (alert) => ({
  type: SET_SYSTEM_ALERT,
  alert,
});

export const removeSystemAlert = () => ({
  type: REMOVE_SYSTEM_ALERT,
});
