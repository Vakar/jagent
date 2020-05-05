import Grid from "@material-ui/core/Grid";
import GridContainer from "./GridContainer";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign({ children: "All" }, propOverrides);

  const renderer = createRenderer();
  renderer.render(<GridContainer {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component GridContainer", () => {
  it("should render correctly", () => {
    const { output } = setup();
    expect(output.type).toBe(Grid);
    expect(output.props.children).toBe("All");
  });
});
