import React from "react";
import { Formik, Form, Field } from "formik";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { TextField } from "formik-material-ui";
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
        <Typography variant="h4">Masuk Member Rantai Pasok</Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username tidak boleh kosong";
            } else if (!values.password) {
              errors.password = "Password tidak boleh kosong";
            }
            return errors;
          }}
          onSubmit={(values) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              props.handleLogin(values);
            }, 500);
          }}
        >
          {({ submitForm, values }) => (
            <Form>
              <Field
                className={classes.button}
                component={TextField}
                name="username"
                type="username"
                label="Username"
              />
              <br />
              <Field
                className={classes.button}
                component={TextField}
                type="password"
                label="Password"
                name="password"
              />
              <br />
              <br />
              <Button
                className={classes.button}
                disabled={values.password.length < 6}
                variant="contained"
                color="primary"
                onClick={submitForm}
                component={RouterLink}
                to="/"
              >
                Masuk
              </Button>
            </Form>
          )}
        </Formik>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/"
          className={classes.button}
        >
          kembali ke halaman awal
        </Button>
      </Container>
    </>
  );
}

export default LoginPage;
