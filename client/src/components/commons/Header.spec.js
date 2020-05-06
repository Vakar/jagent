import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createRenderer } from "react-test-renderer/shallow";

const setup = () => {
  const renderer = createRenderer();
  renderer.render(<Header />);
  return renderer.getRenderOutput();
};

describe("component Header", () => {
  it("should render container", () => {
    const output = setup();
    expect(output.type).toBe(AppBar);
  });

  describe("Toolbar", () => {
    it("should render", () => {
      const output = setup();
      const toolbar = output.props.children;
      expect(toolbar.type).toBe(Toolbar);
    });

    describe("Typography", () => {
      it("should render", () => {
        const output = setup();
        const [typography] = output.props.children.props.children;
        expect(typography.type).toBe(Typography);
      });
    });

    describe("Logout Button", () => {
      it("should render", () => {
        const output = setup();
        const [, button] = output.props.children.props.children;
        expect(button.type).toBe(Button);
        expect(button.props.href).toBe("/logout");
      });
    });
  });
});
