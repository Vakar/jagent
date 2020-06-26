import AutocompleteSelect from "../containers/AutocompleteSelect";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
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
  describe("Grid 0: FORM HEADER", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[0];
      expect(grid.type).toBe(Grid);
    });
  });

  describe("Grid 1: SEARCH PROPERTIES", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[1];
      expect(grid.type).toBe(Grid);
    });
    describe("RadioGroup", () => {
      it("should render container", () => {
        const { output } = setup();
        const radioGroup = output.props.children[1].props.children;
        expect(radioGroup.type).toBe(RadioGroup);
      });
      describe("FormControlLabel", () => {
        it("should render container", () => {
          const { output } = setup();
          const formControlLabel =
            output.props.children[1].props.children.props.children;
          expect(formControlLabel.type).toBe(FormControlLabel);
        });
      });
    });
  });

  describe("Grid 2: AUTOCOMPLETE CITY SELECT", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[2];
      expect(grid.type).toBe(Grid);
    });
    describe("AutocompleteSelect", () => {
      it("should render container", () => {
        const { output } = setup();
        const autocompleteSelect = output.props.children[2].props.children;
        expect(autocompleteSelect.type).toBe(AutocompleteSelect);
      });
    });
  });

  describe("Grid 3: mock", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[3];
      expect(grid.type).toBe(Grid);
    });
  });

  describe("Grid 4: KEYWORDS AND SUBMIT BUTTON", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[4];
      expect(grid.type).toBe(Grid);
    });
    describe("Grid 0: Left side space", () => {
      it("should render container", () => {
        const { output } = setup();
        const grid = output.props.children[4].props.children[0];
        expect(grid.type).toBe(Grid);
      });
    });
    describe("Grid 1: Input container", () => {
      it("should render container", () => {
        const { output } = setup();
        const grid = output.props.children[4].props.children[1];
        expect(grid.type).toBe(Grid);
      });
      describe("TextField", () => {
        it("should render container", () => {
          const { output } = setup();
          const textField =
            output.props.children[4].props.children[1].props.children;
          expect(textField.type).toBe(TextField);
        });
      });
    });
    describe("Grid 2: Submit button container", () => {
      it("should render container", () => {
        const { output } = setup();
        const grid = output.props.children[4].props.children[2];
        expect(grid.type).toBe(Grid);
      });
      describe("Button", () => {
        it("should render container", () => {
          const { output } = setup();
          const button =
            output.props.children[4].props.children[2].props.children;
          expect(button.type).toBe(Button);
        });
      });
    });
  });
  describe("Grid 3: Right side space", () => {
    it("should render container", () => {
      const { output } = setup();
      const grid = output.props.children[4].props.children[3];
      expect(grid.type).toBe(Grid);
    });
  });
});
