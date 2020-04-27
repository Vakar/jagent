import React, { Component } from "react";

import CompanyCard from "./components/elements/CompanyCard";
import Grid from "@material-ui/core/Grid";
import GridContainer from "./components/elements/GridContainer";

class App extends Component {
  // Initialize state
  state = { companies: [] };

  getCompanies() {
    fetch("/api/rest/companies")
      .then((res) => res.json())
      .then((companies) => this.setState({ companies }));
  }

  // Fetch passwords after first mount
  componentDidMount = () => {
    this.getCompanies();
  };

  render() {
    return (
      <GridContainer>
        {this.state.companies.map((company) => (
          <Grid key={company._id} item>
            <CompanyCard company={company} />
          </Grid>
        ))}
      </GridContainer>
    );
  }
}

export default App;
