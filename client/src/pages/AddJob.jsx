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
import Typography from "@material-ui/core/Typography";
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
      <GridContainer>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" align="center">
              Add new job:
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="center"
            justify="space-evenly"
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="name"
                name="name"
                label="Job name"
                onInput={this.handleName}
                value={this.state.name}
                variant="outlined"
                size="small"
                helperText={this.state.nameHelperText}
                fullWidth
                InputProps={this.state.nameInputValidationState}
                FormHelperTextProps={this.state.nameInputValidationState}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" onClick={() => this.handleSubmit()}>
                Save
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Grid>
      </GridContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ saveJob: saveJob }, dispatch);

export default connect(null, mapDispatchToProps)(AddJob);
