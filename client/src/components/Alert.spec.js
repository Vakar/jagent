import Alert from "./Alert";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

const setup = () => {
  const renderer = createRenderer();
  renderer.render(<Alert />);
  return renderer.getRenderOutput();
};

describe("container Alert", () => {
  it("should render container", () => {
    const output = setup();
    expect(output.type).toBe(MuiAlert);
  });
});
