import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import { copyright, domain } from "config";

import ipb_logo from "./ipb-logo.png";
import kementan_logo from "./kementan-logo-horizontal.jpg";
import arung_logo from "./arung-logo.png";

import useStyles from "./styles";

function Copyright() {
  const classes = useStyles();

  return (
    <Box pt={2} pb={2}>
      <Box className={classes.content}>
        <img
          className={classes.logoBigger}
          src={kementan_logo}
          alt="Logo Kementrian Pertanian"
        />
        <Box className={classes.contentHorizontal}>
          <img className={classes.logo} src={ipb_logo} alt="Logo IPB" />
          <img className={classes.logo} src={arung_logo} alt="Logo Arung" />
        </Box>
      </Box>

      <Typography
        className={classes.copyright}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {copyright.title}
        <Link color="inherit" href={domain}>
          {copyright.link}
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Copyright;
