import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Typography from "@material-ui/core/Typography";

const Vacancy = ({ vacancy }) => {
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
        <Button>Save</Button>
        <Button>Go to origin</Button>
      </CardActions>
    </Card>
  );
};

export default Vacancy;
