import Container from "./Container";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign({ children: "All" }, propOverrides);

  const renderer = createRenderer();
  renderer.render(<Container {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component Container", () => {
  it("should render correctly", () => {
    const { output } = setup();
    expect(output.type).toBe("main");
    expect(output.props.children).toBe("All");
  });
});
