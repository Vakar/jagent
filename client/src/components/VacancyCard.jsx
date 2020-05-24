import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Vacancy from "../models/vacancy";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const VacancyCard = ({ vacancy, deleteVacancy }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {vacancy.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => deleteVacancy(vacancy.id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

VacancyCard.propTypes = {
  vacancy: PropTypes.instanceOf(Vacancy),
  deleteVacancy: PropTypes.func.isRequired,
};

export default VacancyCard;
