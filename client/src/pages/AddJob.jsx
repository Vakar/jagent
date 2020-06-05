import {
  GLOBAL,
  NOT_LETTERS_OR_SPACE,
} from "../utils/validation/regexpPatterns";
import React, { Component } from "react";
import {
  isStringContains,
  isStringLonger,
  isStringShorterOrEqual,
} from "../utils/validation/stringValidators";

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

  validateName(name) {
    const MIN_LENGTH = 1;
    const MAX_LENGTH = 36;
    let validationState = { error: true };
    let helperText = "";
    if (isStringContains(name, NOT_LETTERS_OR_SPACE, GLOBAL)) {
      helperText = "Should contains only letters.";
    } else if (isStringShorterOrEqual(name, MIN_LENGTH)) {
      helperText = `Should be longer then ${MIN_LENGTH} characters.`;
    } else if (isStringLonger(name, MAX_LENGTH)) {
      helperText = `Shouldn't be longer then ${MAX_LENGTH} characters. `;
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
