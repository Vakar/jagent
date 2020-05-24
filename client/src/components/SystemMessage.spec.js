import Alert from "./Alert";
import { ERROR } from "../models/alertTypes";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SystemMessage from "./SystemMessage";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      removeAlert: jest.fn(),
      alert: new Alert("error message", ERROR),
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<SystemMessage {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component SystemMessage", () => {
  it("should render container", () => {
    const { output } = setup();
    expect(output.type).toBe(Snackbar);
  });
  describe("Alert", () => {
    it("should render container", () => {
      const { output } = setup();
      const alert = output.props.children;
      expect(alert.type).toBe(Alert);
    });
  });
});
