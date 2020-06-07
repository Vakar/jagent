import FoundVacancyCard from "../containers/FoundVacancyCard";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React from "react";

const FoundVacancyList = ({ vacancies }) => {
  return (
    <Grid container item xs={12} spacing={1}>
      {vacancies.map((vacancy) => (
        <Grid key={vacancy.vacancyId} item xs={12}>
          <FoundVacancyCard vacancy={vacancy} />
        </Grid>
      ))}
    </Grid>
  );
};

FoundVacancyList.propTypes = {
  vacancies: PropTypes.arrayOf(Object).isRequired,
};

export default FoundVacancyList;
