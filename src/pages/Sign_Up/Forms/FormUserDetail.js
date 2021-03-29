import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";
import InputPasswordField from "../FormFields/InputPasswordField";

import DatePickerField from "../FormFields/DatePickerField";

export default function FormUserDetail(props) {
  const {
    formField: { name, contact, dateOfBirth, username, password },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputField name={name.name} label={name.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={contact.name} label={contact.label} fullWidth />
        </Grid>
        {/* Username is generated */}
        <Grid item xs={12}>
          <InputField name={username.name} label={username.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputPasswordField
            name={password.name}
            label={password.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <DatePickerField
            name={dateOfBirth.name}
            label={dateOfBirth.label}
            format="dd/mm/yy"
            openTo="year"
            views={["date", "month", "year"]}
            disableFuture={true}
            minDate={new Date("1945/8/17")}
            maxDate={new Date("2050/12/31")}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
