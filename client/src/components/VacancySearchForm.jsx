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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default class VacancySearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleKeyWords = this.handleKeyWords.bind(this);
    this.state = {
      keyWords: "",
      keyWordsInputValidationState: {
        error: false,
      },
      keyWordsHelperText: "",
      selectedSite: "rabotaUa",
      selectedCity: "Kharkiv",
    };
  }

  validateKeyWords(keyWords) {
    const MIN_LENGTH = 1;
    const MAX_LENGTH = 128;
    let validationState = { error: true };
    let helperText = "";
    if (isStringContains(keyWords, NOT_LETTERS_OR_SPACE, GLOBAL)) {
      helperText = "Should contains only letters.";
    } else if (isStringShorterOrEqual(keyWords, MIN_LENGTH)) {
      helperText = `Should be longer then ${MIN_LENGTH} characters.`;
    } else if (isStringLonger(keyWords, MAX_LENGTH)) {
      helperText = `Shouldn't be longer then ${MAX_LENGTH} characters. `;
    } else {
      validationState = { error: false };
    }
    return [validationState, helperText];
  }

  handleKeyWords(event) {
    const keyWords = event.target.value;
    const [validationState, helperText] = this.validateKeyWords(keyWords);
    this.setState({
      keyWordsInputValidationState: validationState,
      keyWordsHelperText: helperText,
      keyWords: keyWords,
    });
  }

  handleSearch() {
    const isKeyWordsValid = !this.state.keyWordsInputValidationState.error;
    if (isKeyWordsValid) {
      const { searchVacancies } = this.props;
      const searchParams = {
        ukrainian: true,
        keyWords: this.state.keyWords,
        cityId: 21,
      };
      searchVacancies(searchParams);
    }
  }

  render() {
    const { selectedSite, selectedCity } = this.state;
    return (
      <Grid container item xs={12} spacing={1}>
        {/* FORM HEADER */}
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" align="left">
            Search form:
          </Typography>
        </Grid>
        {/* SEARCH PROPERTIES */}
        <Grid item xs={12}>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="start"
              control={
                <Radio
                  disabled
                  checked={selectedSite === "rabotaUa"}
                  value="rabotaUa"
                  name="site"
                />
              }
              label="rabota.ua"
            />
            <FormControlLabel
              value="start"
              control={
                <Radio
                  disabled
                  checked={selectedCity === "Kharkiv"}
                  value="Kharkiv"
                  name="city"
                />
              }
              label="Kharkiv"
            />
          </RadioGroup>
        </Grid>
        {/* KEYWORDS AND SUBMIT BUTTON */}
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
              id="keyWords"
              name="keyWords"
              label="Key words"
              onInput={this.handleKeyWords}
              value={this.state.keyWords}
              variant="outlined"
              helperText={this.state.keyWordsHelperText}
              fullWidth
              InputProps={this.state.keyWordsInputValidationState}
              FormHelperTextProps={this.state.keyWordsInputValidationState}
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" onClick={() => this.handleSearch()}>
              Search
            </Button>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
    );
  }
}

VacancySearchForm.propTypes = {
  searchVacancies: PropTypes.func.isRequired,
};
