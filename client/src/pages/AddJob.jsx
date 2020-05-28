import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GridContainer from "../components/GridContainer";
import TextField from "@material-ui/core/TextField";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveJob } from "../api/jobs";

class AddJob extends Component {
  constructor(props) {
    super(props);
    this.handleName = this.handleName.bind(this);
    this.state = {
      name: "",
      nameInputValidationState: {
        error: false,
      },
      nameHelperText: "",
    };
  }

  static get MIN_NAME_LENGTH() {
    return 1;
  }

  static get MAX_NAME_LENGTH() {
    return 36;
  }

  isNameLongerThenMinNameLength(name) {
    return name.length > AddJob.MIN_NAME_LENGTH;
  }

  isNameNotLongerThenMaxNameLength(name) {
    return name.length <= AddJob.MAX_NAME_LENGTH;
  }

  isNameContainsOnlyLettersOrSpace(name) {
    const notLetterOrSpace = /[^a-zA-Z|\s]/g;
    return !notLetterOrSpace.test(name);
  }

  validateName(name) {
    let validationState = { error: true };
    let helperText = "";
    if (!this.isNameContainsOnlyLettersOrSpace(name)) {
      helperText = "Should contains only letters.";
    } else if (!this.isNameLongerThenMinNameLength(name)) {
      helperText = `Should be longer then ${AddJob.MIN_NAME_LENGTH} characters.`;
    } else if (!this.isNameNotLongerThenMaxNameLength(name)) {
      helperText = `Shouldn't be longer then ${AddJob.MAX_NAME_LENGTH} characters. `;
    } else {
      validationState = { error: false };
    }
    return [validationState, helperText];
  }

  handleName(event) {
    const name = event.target.value;
    const [validationState, helperText] = this.validateName(name);
    this.setState({
      nameInputValidationState: validationState,
      nameHelperText: helperText,
      name: name,
    });
  }

  handleSubmit() {
    const isNameValid = !this.state.nameInputValidationState.error;
    if (isNameValid) {
      const { saveJob } = this.props;
      saveJob(this.state.name);
      this.props.history.push("/index.html");
    }
  }

  render() {
    return (
      <React.Fragment>
        <GridContainer>
          <Grid item lg={4} md={4} sm={2}></Grid>
          <Grid item lg={4} md={4} sm={8}>
            <TextField
              required
              id="name"
              name="name"
              label="Job name"
              onInput={this.handleName}
              value={this.state.name}
              variant="outlined"
              helperText={this.state.nameHelperText}
              fullWidth
              InputProps={this.state.nameInputValidationState}
              FormHelperTextProps={this.state.nameInputValidationState}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={2}></Grid>
          <Grid item lg={4} md={4} sm={2}></Grid>
          <Grid item lg={4} md={4} sm={8}>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.handleSubmit()}
            >
              Save
            </Button>
          </Grid>
          <Grid item lg={4} md={4} sm={2}></Grid>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ saveJob: saveJob }, dispatch);

export default connect(null, mapDispatchToProps)(AddJob);
