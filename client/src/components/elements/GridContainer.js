import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
}));

export default function GridContainer(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.control} justify="center" spacing={2}>
      {props.children}
    </Grid>
  );
}
