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

  componentDidMount() {
    const { fetchVacancies, job } = this.props;
    fetchVacancies(job._id);
  }

  render() {
    const { savedVacancies, foundVacancies, job } = this.props;
    return (
      <GridContainer>
        <JobName jobName={job.name} />
        <SavedVacancyList vacancies={savedVacancies} />
        <VacancySearchForm></VacancySearchForm>
        <FoundVacancyList vacancies={foundVacancies} />
      </GridContainer>
    );
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
