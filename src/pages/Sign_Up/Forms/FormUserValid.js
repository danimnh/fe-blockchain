import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";

export default function FormUserValid(props) {
  const {
    formField: { noKK, noNPWP, noNIK },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputField name={noKK.name} label={noKK.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={noNPWP.name} label={noNPWP.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={noNIK.name} label={noNIK.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}
