import React, { Component } from "react";

import GridContainer from "../components/GridContainer";
import JobName from "../components/JobName";
import VacancyList from "../components/VacancyList";
import VacancySearchForm from "../components/VacancySearchForm";
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
        <VacancyList vacancies={foundVacancies} />
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
