import {
  Card,
  CardActionArea,
  CardContent,
  Link,
  Typography,
} from "@material-ui/core";

import AddCard from "./AddCard";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

const setup = () => {
  const renderer = createRenderer();
  renderer.render(<AddCard />);
  return renderer.getRenderOutput();
};

describe("container AddCard", () => {
  it("should render container", () => {
    const output = setup();
    expect(output.type).toBe(Card);
  });

  describe("CardActionArea", () => {
    it("should render", () => {
      const output = setup();
      const cardActionArea = output.props.children;
      expect(cardActionArea.type).toBe(CardActionArea);
    });

    describe("Link", () => {
      it("should render", () => {
        const output = setup();
        const link = output.props.children.props.children;
        expect(link.type).toBe(Link);
      });

      it("href should be: /addCompany", () => {
        const output = setup();
        const link = output.props.children.props.children;
        expect(link.props.href).toBe("/addCompany");
      });

      describe("CardContent", () => {
        it("should render", () => {
          const output = setup();
          const cardContent =
            output.props.children.props.children.props.children;
          expect(cardContent.type).toBe(CardContent);
        });

        describe("Typography", () => {
          it("should render", () => {
            const output = setup();
            const typography =
              output.props.children.props.children.props.children.props
                .children;
            expect(typography.type).toBe(Typography);
          });
        });
      });
    });
  });
});
