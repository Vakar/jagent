import React, { Component } from "react";

import AddCard from "../components/AddCard";
import Grid from "@material-ui/core/Grid";
import GridContainer from "../components/GridContainer";
import JobCard from "../containers/JobCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchJobs } from "../api/jobs";

class App extends Component {
  componentDidMount() {
    const { fetchJobs } = this.props;
    fetchJobs();
  }

  render() {
    const { jobs } = this.props;
    return (
      <GridContainer>
        {jobs.map((job) => (
          <Grid key={job.id} item>
            <JobCard job={job} />
          </Grid>
        ))}
        <Grid item>
          <AddCard />
        </Grid>
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.jobs.error,
    jobs: state.jobs.jobs,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchJobs: fetchJobs }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
