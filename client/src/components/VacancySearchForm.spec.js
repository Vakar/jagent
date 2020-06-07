import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";
import VacancySearchForm from "./VacancySearchForm";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      searchVacancies: jest.fn(),
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<VacancySearchForm {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component VacancySearchForm", () => {
  it("should render container", () => {
    const { output } = setup();
    expect(output.type).toBe(Grid);
  });
  describe("Grid 0", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[0];
      expect(grid.type).toBe(Grid);
    });
  });
  describe("Grid 1", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[1];
      expect(grid.type).toBe(Grid);
    });
    describe("TextField", () => {
      it("should render container", () => {
        const { output } = setup();
        const textField = output.props.children[1].props.children;
        expect(textField.type).toBe(TextField);
      });
    });
  });
  describe("Grid 2", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[2];
      expect(grid.type).toBe(Grid);
    });
    describe("Button", () => {
      it("should render container", () => {
        const { output } = setup();
        const button = output.props.children[2].props.children;
        expect(button.type).toBe(Button);
      });
    });
  });
  describe("Grid 3", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[3];
      expect(grid.type).toBe(Grid);
    });
  });
});
