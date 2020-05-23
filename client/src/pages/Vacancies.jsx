import React, { Component } from "react";

import AddCard from "../components/AddCard";
import Grid from "@material-ui/core/Grid";
import GridContainer from "../components/GridContainer";
import VacancyCard from "../containers/VacancyCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchVacancies } from "../api/vacancies";

class App extends Component {
  componentDidMount() {
    const { fetchVacancies } = this.props;
    fetchVacancies();
  }

  render() {
    const { vacancies } = this.props;
    return (
      <GridContainer>
        {vacancies.map((vacancy) => (
          <Grid key={vacancy.id} item>
            <VacancyCard vacancy={vacancy} />
          </Grid>
        ))}
        <Grid item>
          <AddCard />
        </Grid>
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.vacancy.error,
    vacancies: state.vacancy.vacancies,
    pending: state.vacancy.pending,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchVacancies: fetchVacancies }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
