import React, { Component } from "react";

import API from "../util/api";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridContainer from "../components/elements/GridContainer";
import TextField from "@material-ui/core/TextField";

export default class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.handleName = this.handleName.bind(this);
    this.state = { name: "" };
  }
  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  handleSubmit() {
    fetch(API.companies(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "5e9ef78f27e87c78e618928f", // todo: don't use hard code user id
        name: this.state.name,
      }),
    })
      .then(this.props.history.push("/"))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
        <GridContainer>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Company name"
              onInput={this.handleName}
              value={this.state.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleSubmit()}
            >
              Submit
            </Button>
          </Grid>
        </GridContainer>
      </React.Fragment>
    );
  }
}
