import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import Job from "../models/job";
import JobCard from "./JobCard";
import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

const setup = (propOverrides) => {
  const props = Object.assign(
    {
      deleteJob: jest.fn(),
      job: new Job("5e9ef982a325ed7eb2887c10", "someName"),
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<JobCard {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component JobCard", () => {
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

        it("should show job name properly", () => {
          const jobName = "name";
          const { output } = setup({
            job: { _id: "1", name: jobName },
          });
          const typography =
            output.props.children[0].props.children.props.children;
          expect(typography.props.children).toBe(jobName);
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
