import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import CompanyCard from "./CompanyCard";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      deleteCompany: jest.fn(),
      company: { _id: "5e9ef982a325ed7eb2887c10", name: "someName" },
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<CompanyCard {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component CompanyCard", () => {
  it("should render container", () => {
    const { output } = setup();
    const card = output;
    expect(card.type).toBe(Card);
  });

  describe("CardActionArea", () => {
    it("should render", () => {
      const { output } = setup();
      const [cardActionArea] = output.props.children;
      expect(cardActionArea.type).toBe(CardActionArea);
    });

    describe("CardContent", () => {
      it("should render", () => {
        const { output } = setup();
        const cardContent = output.props.children[0].props.children;
        expect(cardContent.type).toBe(CardContent);
      });

      describe("Typography", () => {
        it("should render", () => {
          const { output } = setup();
          const typography =
            output.props.children[0].props.children.props.children;
          expect(typography.type).toBe(Typography);
        });

        it("should show company name properly", () => {
          const COMPANY_NAME = "name";
          const { output } = setup({
            company: { _id: "1", name: COMPANY_NAME },
          });
          const typography =
            output.props.children[0].props.children.props.children;
          expect(typography.props.children).toBe(COMPANY_NAME);
        });
      });
    });
  });

  describe("CardAction", () => {
    it("should render", () => {
      const { output } = setup();
      const [, cardAction] = output.props.children;
      expect(cardAction.type).toBe(CardActions);
    });

    describe("Edit Button", () => {
      it("should render", () => {
        const { output } = setup();
        const [editButton] = output.props.children[1].props.children;
        expect(editButton.type).toBe(Button);
      });
    });

    describe("Delete Button", () => {
      it("should render", () => {
        const { output } = setup();
        const [, deleteButton] = output.props.children[1].props.children;
        expect(deleteButton.type).toBe(Button);
      });
    });
  });
});
