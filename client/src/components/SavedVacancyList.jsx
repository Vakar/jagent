import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React from "react";
import SavedVacancyCard from "../containers/SavedVacancyCard";
import Typography from "@material-ui/core/Typography";

const SavedVacancyList = ({ vacancies }) => {
  if (vacancies.length > 0) {
    return (
      <Grid container item xs={12} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" align="left">
            Saved vacancies:
          </Typography>
        </Grid>
        {vacancies.map((vacancy) => (
          <Grid key={vacancy.vacancyId} item xs={12}>
            <SavedVacancyCard vacancy={vacancy} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return null;
  }
};

SavedVacancyList.propTypes = {
  vacancies: PropTypes.arrayOf(Object).isRequired,
};

export default SavedVacancyList;
