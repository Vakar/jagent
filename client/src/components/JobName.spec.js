import Grid from "@material-ui/core/Grid";
import JobName from "./JobName";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      jobName: "job name",
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<JobName {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component JobName", () => {
  it("should render container", () => {
    const { output } = setup();
    expect(output.type).toBe(Grid);
  });
  describe("Grid", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children;
      expect(grid.type).toBe(Grid);
    });
    describe("Typography", () => {
      it("should render container", () => {
        const { output } = setup();
        const typography = output.props.children.props.children;
        expect(typography.type).toBe(Typography);
      });
    });
  });
});
