import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

function Container(props) {
  const classes = useStyles();
  return <main className={classes.root}>{props.children}</main>;
}

export default Container;
