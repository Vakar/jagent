import Link from "@material-ui/core/Link";
import React from "react";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"© "}
      {new Date().getFullYear()}
      {" Copyright: "}
      <Link color="inherit" href="https://vakar.space">
        vakar.space
      </Link>
    </Typography>
  );
}

export default Copyright;
