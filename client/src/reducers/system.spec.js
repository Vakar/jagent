import { removeSystemAlert, setSystemAlert } from "../actions";

import Alert from "../models/alert";
import { ERROR } from "../models/alertTypes";
import chai from "chai";
import system from "./system";

chai.should();

let initialState;
let fullState;
let alert;

describe("systemMessages reducer", () => {
  beforeEach(() => {
    initialState = {
      alert: undefined,
    };
    alert = new Alert("message", ERROR);
    fullState = {
      alert: alert,
    };
  });

  it("should handle initial state", () => {
    system(undefined, {}).should.to.deep.equal(initialState);
  });

  it("SET_SYSTEM_ALERT | should set system alert", () => {
    const action = setSystemAlert(alert);
    system(initialState, action).should.to.deep.equal(fullState);
  });

  it("REMOVE_SYSTEM_ALERT | should remove system alert", () => {
    const action = removeSystemAlert();
    system(fullState, action).should.to.deep.equal(initialState);
  });
});
