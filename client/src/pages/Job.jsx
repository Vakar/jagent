import React, { Component } from "react";

import FoundVacancyList from "../components/FoundVacancyList";
import GridContainer from "../components/GridContainer";
import JobName from "../components/JobName";
import SavedVacancyList from "../components/SavedVacancyList";
import VacancySearchForm from "../containers/VacancySearchForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchVacancies } from "../api/vacancies";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWords: "",
      keyWordsInputValidationState: {
        error: false,
      },
      keyWordsHelperText: "",
    };
  }

  render() {
    const {
      savedVacancies,
      fetchVacancies,
      foundVacancies,
      job,
      history,
    } = this.props;
    if (job) {
      fetchVacancies(job._id);
      return (
        <GridContainer>
          <JobName jobName={job.name} />
          <SavedVacancyList vacancies={savedVacancies} />
          <VacancySearchForm></VacancySearchForm>
          <FoundVacancyList vacancies={foundVacancies} />
        </GridContainer>
      );
    } else {
      history.push("/index.html");
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.job.selectedJob,
    foundVacancies: state.job.foundVacancies,
    savedVacancies: state.job.savedVacancies,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchVacancies: fetchVacancies }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Job);
