import Grid from "@material-ui/core/Grid";
import React from "react";
import SavedVacancyCard from "../containers/SavedVacancyCard";

const SavedVacancyList = ({ vacancies }) => {
  return (
    <Grid container item xs={12} spacing={1}>
      {vacancies.map((vacancy) => (
        <Grid key={vacancy.vacancyId} item xs={12}>
          <SavedVacancyCard vacancy={vacancy} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SavedVacancyList;
