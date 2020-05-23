import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import React from "react";
import Vacancy from "../models/vacancy";
import VacancyCard from "./VacancyCard";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      deleteVacancy: jest.fn(),
      vacancy: new Vacancy("5e9ef982a325ed7eb2887c10", "someName"),
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<VacancyCard {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component VacancyCard", () => {
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

        it("should show vacancy name properly", () => {
          const vacancyName = "name";
          const { output } = setup({
            vacancy: { _id: "1", name: vacancyName },
          });
          const typography =
            output.props.children[0].props.children.props.children;
          expect(typography.props.children).toBe(vacancyName);
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

    describe("Delete Button", () => {
      it("should render", () => {
        const { output } = setup();
        const deleteButton = output.props.children[1].props.children;
        expect(deleteButton.type).toBe(Button);
      });
    });
  });
});
