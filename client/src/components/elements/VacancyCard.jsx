import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
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
          <Typography variant="h5" component="h2">
            {vacancy.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button startIcon={<EditIcon />}>Edit</Button>
        <Button
          onClick={() => deleteVacancy(vacancy._id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

VacancyCard.propTypes = {
  vacancy: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  deleteVacancy: PropTypes.func.isRequired,
};

export default VacancyCard;
