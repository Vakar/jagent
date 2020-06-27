import Copyright from "./Copyright";
import Link from "@material-ui/core/Link";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { createRenderer } from "react-test-renderer/shallow";

const setup = () => {
  const renderer = createRenderer();
  renderer.render(<Copyright />);
  return renderer.getRenderOutput();
};

describe("components Copyright", () => {
  it("should render container", () => {
    const output = setup();
    expect(output.type).toBe(Typography);
  });

  describe("link", () => {
    it("should render", () => {
      const output = setup();
      const link = output.props.children[3];
      expect(link.type).toBe(Link);
      expect(link.props.href).toBe("https://vakar.space");
    });
  });
});
