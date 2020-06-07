import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
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

SavedVacancyList.propTypes = {
  vacancies: PropTypes.arrayOf(Object).isRequired,
};

export default SavedVacancyList;
