import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import ForwardIcon from "@material-ui/icons/Forward";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const JobCard = ({
  job,
  deleteJob,
  setJob,
  cleanFoundVacancies,
  cleanSavedVacancies,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const moveOn = (selectedJob) => {
    setJob(selectedJob);
    cleanSavedVacancies();
    cleanFoundVacancies();
    history.push("/job");
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {job.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => deleteJob(job._id)} startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button onClick={() => moveOn(job)} startIcon={<ForwardIcon />}>
          Move On
        </Button>
      </CardActions>
    </Card>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  deleteJob: PropTypes.func.isRequired,
};

export default JobCard;
