import Container from "@material-ui/core/Container";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

function Companies() {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Your companies
        </Typography>
        <Typography
          variant="h5"
          align="justify"
          color="textSecondary"
          paragraph
        >
          You can manage your companies on this page.
        </Typography>
      </Container>
    </div>
  );
}

export default Companies;
