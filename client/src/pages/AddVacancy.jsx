import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridContainer from "../components/GridContainer";
import TextField from "@material-ui/core/TextField";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveVacancy } from "../api/vacancies";

class AddVacancy extends Component {
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
    const { saveVacancy } = this.props;
    saveVacancy(this.state.name);
    this.props.history.push("/index.html");
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
              label="Vacancy name"
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ saveVacancy: saveVacancy }, dispatch);

export default connect(null, mapDispatchToProps)(AddVacancy);
