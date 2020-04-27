import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
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
        <Link href="/addCompany" color="textPrimary" underline="none">
          <CardContent align="center">
            <Typography variant="h5" component="h2">
              Add new company
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Button startIcon={<AddBoxIcon />}>Add</Button>
      </CardActions>
    </Card>
  );
}
