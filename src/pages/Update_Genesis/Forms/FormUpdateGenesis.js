import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";

import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";

export default function FormUpdateGenesis(props) {
  const {
    UpdateGenesisFields: { genesisID, kuantitasBenihKg },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField name={genesisID.name} label={genesisID.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitasBenihKg.name}
            label={kuantitasBenihKg.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
