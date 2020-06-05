import Grid from "@material-ui/core/Grid";
import React from "react";
import Vacancy from "./Vacancy";

const VacancyList = ({ vacancies }) => {
  return (
    <Grid container item xs={12} spacing={1}>
      {vacancies.map((vacancy) => (
        <Grid key={vacancy.vacancyId} item xs={12}>
          <Vacancy vacancy={vacancy} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VacancyList;
