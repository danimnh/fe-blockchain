import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";

export default function FormUserTypeDetail(props) {
  const {
    formField: { memberInfo },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputField
            name={memberInfo.name}
            label={memberInfo.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
