import React from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Meta from "components/Meta";

import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";

function LoginPage(props) {
  const classes = useStyles();
  // const handleLogin = () => {
  //   setLoggedIn(!isLoggedIn);
  //   console.log(isLoggedIn);
  // };
  return (
    <>
      <Meta title="Login Page" description="Login Page" />
      <Container maxWidth="sm" className={classes.root}>
        <TextField placeholder="username" />
        <TextField placeholder="password" />
        <Button
          component={RouterLink}
          to="/"
          onClick={props.handleLogin("abcde")}
        >
          Login
        </Button>
        <Button component={RouterLink} to="/">
          kembali ke halaman awal
        </Button>
      </Container>
    </>
  );
}

export default LoginPage;
