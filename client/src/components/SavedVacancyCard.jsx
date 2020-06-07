import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Vacancy from "../models/vacancy";

const SavedVacancyCard = ({
  jobId,
  vacancy,
  removeVacancy,
  openVacancyPage,
}) => {
  const handleDelete = () => {
    removeVacancy(jobId, vacancy._id);
  };
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {vacancy.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {vacancy.companyName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {vacancy.shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => handleDelete()}>Delete</Button>
        <Button onClick={() => openVacancyPage(vacancy.vacancyId)}>
          Go to origin
        </Button>
      </CardActions>
    </Card>
  );
};

SavedVacancyCard.propTypes = {
  jobId: PropTypes.string.isRequired,
  vacancy: PropTypes.instanceOf(Vacancy).isRequired,
  removeVacancy: PropTypes.func.isRequired,
  openVacancyPage: PropTypes.func.isRequired,
};

export default SavedVacancyCard;
