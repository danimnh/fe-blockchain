import React from "react";

import Container from "@material-ui/core/Container";

import Meta from "components/Meta";

import useStyles from "./styles";

function LoginPage() {
  const classes = useStyles();

  return (
    <>
      <Meta title="Login Page" description="Login Page" />
      <Container maxWidth="sm" className={classes.root}>
        asdadsasd login
      </Container>
    </>
  );
}

export default LoginPage;
