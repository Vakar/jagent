import AutocompleteSelect from "./AutocompleteSelect";
import City from "../models/city";
import NoSsr from "@material-ui/core/NoSsr";
import React from "react";
import Select from "react-select";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      cityMapper: jest.fn(),
      cities: [new City("London", 1)],
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<AutocompleteSelect {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component AutocompleteSelect", () => {
  it("should render container when cities property exists", () => {
    const { output } = setup();
    expect(output.type).toBe(NoSsr);
  });
  it("should not render container when cities property does not exists", () => {
    const { output } = setup({ cities: null });
    expect(output).toBe(null);
  });
  describe("Select", () => {
    it("should render container", () => {
      const { output } = setup();
      const select = output.props.children;
      expect(select.type).toBe(Select);
    });
  });
});
