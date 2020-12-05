import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";

export default function FormUserJob(props) {
  const {
    formField: { memberType },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputField
            name={memberType.name}
            label={memberType.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
