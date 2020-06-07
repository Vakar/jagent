import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import SavedVacancyCard from "./SavedVacancyCard";
import Typography from "@material-ui/core/Typography";
import VacancyBuilder from "../models/vacancyBuilder";
import { createRenderer } from "react-test-renderer/shallow";

const vacancy = new VacancyBuilder()
  .with_id("5e93293ddd39d295dae546b1")
  .withVacancyId("vacancyId")
  .withName("name")
  .withDate(new Date())
  .withCompanyName("company name")
  .withShortDescription("short description")
  .build();

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      jobId: "job id",
      vacancy: vacancy,
      removeVacancy: jest.fn(),
      openVacancyPage: jest.fn(),
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<SavedVacancyCard {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component SavedVacancyCard", () => {
  it("should render container", () => {
    const { output } = setup();
    expect(output.type).toBe(Card);
  });
  describe("CardActionArea", () => {
    it("should render container", () => {
      const { output } = setup();
      const cardActionArea = output.props.children[0];
      expect(cardActionArea.type).toBe(CardActionArea);
    });
    describe("CardContent", () => {
      it("should render container", () => {
        const { output } = setup();
        const cardContent = output.props.children[0].props.children;
        expect(cardContent.type).toBe(CardContent);
      });
      describe("Typography 0", () => {
        it("should render container", () => {
          const { output } = setup();
          const typography =
            output.props.children[0].props.children.props.children[0];
          expect(typography.type).toBe(Typography);
        });
      });
      describe("Typography 1", () => {
        it("should render container", () => {
          const { output } = setup();
          const typography =
            output.props.children[0].props.children.props.children[1];
          expect(typography.type).toBe(Typography);
        });
      });
      describe("Typography 2", () => {
        it("should render container", () => {
          const { output } = setup();
          const typography =
            output.props.children[0].props.children.props.children[2];
          expect(typography.type).toBe(Typography);
        });
      });
    });
  });
  describe("CardActions", () => {
    it("should render container", () => {
      const { output } = setup();
      const cardActions = output.props.children[1];
      expect(cardActions.type).toBe(CardActions);
    });
    describe("Button 0", () => {
      it("should render container", () => {
        const { output } = setup();
        const button = output.props.children[1].props.children[0];
        expect(button.type).toBe(Button);
      });
    });
    describe("Button 1", () => {
      it("should render container", () => {
        const { output } = setup();
        const button = output.props.children[1].props.children[1];
        expect(button.type).toBe(Button);
      });
    });
  });
});
