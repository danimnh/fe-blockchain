import React from "react";
import { Formik, Form, Field } from "formik";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "@material-ui/core";

import { TextField } from "formik-material-ui";
import InputRadioField from "../Sign_Up/FormFields/InputRadioField";

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
        <div className={classes.headline}>
          <Typography variant="h4" align="center">
            Halaman Login
          </Typography>
          <Typography variant="h4" align="center">
            Sistem Rantai Pasok
          </Typography>
        </div>

        <Formik
          initialValues={{ username: "", password: "", orgName: "" }}
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
              // alert(JSON.stringify(values, null, 2));
              console.log(values);
              props.handleLogin(values);
              // setIsLoading(false);
              // localStorage.setItem("user", values.username);
            }, 500);
          }}
        >
          {({ submitForm, values }) => (
            <Form>
              <Grid>
                <Grid item xs={12}>
                  <Field
                    className={classes.button}
                    component={TextField}
                    variant="outlined"
                    name="username"
                    type="username"
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    className={classes.button}
                    component={TextField}
                    variant="outlined"
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputRadioField
                    name="orgName"
                    label="orgName"
                    values={["Penangkar", "Petani", "Pengumpul", "Pedagang"]}
                  />
                </Grid>
              </Grid>

              <Button
                className={classes.button}
                disabled={
                  values.password.length < 6 || values.username.length < 6
                }
                variant="contained"
                color="primary"
                onClick={submitForm}
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
