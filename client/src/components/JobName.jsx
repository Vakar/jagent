import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";

const JobName = ({ jobName }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" align="center">
          {jobName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default JobName;
