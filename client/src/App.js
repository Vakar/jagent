import React, { Component } from "react";

import API from "./util/api";
import AddCard from "./components/elements/AddCard";
import CompanyCard from "./components/elements/CompanyCard";
import Grid from "@material-ui/core/Grid";
import GridContainer from "./components/elements/GridContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.deleteCompany = this.deleteCompany.bind(this);
  }

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

  deleteCompany = (id) => {
    const url = API.deleteCompany(id);
    fetch(url, { method: "DELETE" }).then(() => {
      const companies = this.state.companies.filter(
        (company) => company._id !== id
      );
      this.setState({ companies: companies });
    });
  };

  render() {
    return (
      <GridContainer>
        {this.state.companies.map((company) => (
          <Grid key={company._id} item>
            <CompanyCard deleteCompany={this.deleteCompany} company={company} />
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
