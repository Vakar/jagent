import React, { Component } from "react";

import API from "./util/api";
import AddCard from "./components/elements/AddCard";
import Grid from "@material-ui/core/Grid";
import GridContainer from "./components/elements/GridContainer";
import VacancyCard from "./components/elements/VacancyCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { vacancies: [] };
    this.deleteVacancy = this.deleteVacancy.bind(this);
  }

  getVacancies() {
    fetch("/api/rest/vacancies")
      .then((res) => res.json())
      .then((vacancies) => this.setState({ vacancies }));
  }

  componentDidMount = () => {
    this.getVacancies();
  };

  deleteVacancy = (id) => {
    const url = API.deleteVacancy(id);
    fetch(url, { method: "DELETE" }).then(() => {
      const vacancies = this.state.vacancies.filter(
        (vacancy) => vacancy._id !== id
      );
      this.setState({ vacancies: vacancies });
    });
  };

  render() {
    return (
      <GridContainer>
        {this.state.vacancies.map((vacancy) => (
          <Grid key={vacancy._id} item>
            <VacancyCard deleteVacancy={this.deleteVacancy} vacancy={vacancy} />
          </Grid>
        ))}
        <Grid item>
          <AddCard />
        </Grid>
      </GridContainer>
    );
  }
}

export default App;
