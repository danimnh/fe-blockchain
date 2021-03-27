import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputRadioField from "../FormFields/InputRadioField";

export default function FormUserJob(props) {
  const {
    formField: { memberType },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputRadioField
            name={memberType.name}
            label={memberType.label}
            values={["Penangkar", "Petani", "Pengumpul", "Pedagang"]}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
