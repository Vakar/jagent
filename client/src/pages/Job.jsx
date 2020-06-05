import React, { Component } from "react";

import FoundVacancyList from "../components/FoundVacancyList";
import GridContainer from "../components/GridContainer";
import JobName from "../components/JobName";
import VacancySearchForm from "../containers/VacancySearchForm";
import { connect } from "react-redux";

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
    // todo: fetch data from saved vacancies api
  }

  render() {
    const { foundVacancies, job } = this.props;
    return (
      <GridContainer>
        <JobName jobName={job.name} />
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

export default connect(mapStateToProps, null)(Job);
