import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function AddCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <Link href="/AddJob" color="textPrimary" underline="none">
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              Add new job
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
