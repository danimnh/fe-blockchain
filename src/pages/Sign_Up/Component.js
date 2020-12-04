import React from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Meta from "components/Meta";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

function SignUpPage() {
  const classes = useStyles();

  return (
    <>
      <Meta title="Signup Page" description="Signup Page" />
      <Container maxWidth="sm" className={classes.root}>
        Sign up
        <TextField placeholder="username" />
        <TextField placeholder="password" />
        <Button component={RouterLink} to="/">
          kembali ke halaman awal
        </Button>
      </Container>
    </>
  );
}

export default SignUpPage;
