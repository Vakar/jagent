import FoundVacancyCard from "../containers/FoundVacancyCard";
import FoundVacancyList from "./FoundVacancyList";
import Grid from "@material-ui/core/Grid";
import React from "react";
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
  renderer.render(<FoundVacancyList {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
};

describe("component FoundVacancyList", () => {
  it("should render container", () => {
    const { output } = setup();
    expect(output.type).toBe(Grid);
  });
});
