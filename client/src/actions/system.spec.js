import * as actions from "./system";

import { REMOVE_SYSTEM_ALERT, SET_SYSTEM_ALERT } from "./types";

import Alert from "../models/alert";
import { ERROR } from "../models/alertTypes";
import chai from "chai";

chai.should();

describe("system actions", () => {
  const alert = new Alert("message string", ERROR);

  it("setSystemAlert should create SET_SYSTEM_ALERT action", () => {
    actions.setSystemAlert(alert).should.to.deep.equal({
      type: SET_SYSTEM_ALERT,
      alert: alert,
    });
  });

  it("removeSystemAlert should create REMOVE_SYSTEM_ALERT action", () => {
    actions.removeSystemAlert(alert).should.to.deep.equal({
      type: REMOVE_SYSTEM_ALERT,
    });
  });
});
