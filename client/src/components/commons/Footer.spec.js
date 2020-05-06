import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import Footer from "./Footer";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

const setup = () => {
  const renderer = createRenderer();
  renderer.render(<Footer />);
  return renderer.getRenderOutput();
};

describe("components Footer", () => {
  it("should render container", () => {
    const output = setup();
    expect(output.type).toBe("footer");
  });

  describe("Container", () => {
    it("should render", () => {
      const output = setup();
      const container = output.props.children;
      expect(container.type).toBe(Container);
    });

    describe("Copyright", () => {
      it("should render", () => {
        const output = setup();
        const copyright = output.props.children.props.children;
        expect(copyright.type).toBe(Copyright);
      });
    });
  });
});
