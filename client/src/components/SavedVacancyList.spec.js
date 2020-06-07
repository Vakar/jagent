import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React from "react";
import SavedVacancyCard from "../containers/SavedVacancyCard";
import SavedVacancyList from "./SavedVacancyList";
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
      vacancies: [vacancy],
    },
    propOverrides
  );

  const renderer = createRenderer();
  renderer.render(<SavedVacancyList {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component SavedVacancyList", () => {
  it("should render container", () => {
    const { output } = setup();
    expect(output.type).toBe(Grid);
  });
});
