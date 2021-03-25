import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";
import InputRupiah from "../../Sign_Up/FormFields/InputRupiah";
import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";

export default function FormPkrAddTrx(props) {
  const {
    PkrAddTrxFields: {
      kuantitas,
      harga,
      // umurBenih,
      // lamaPenyimpanan,
      varietas,
      hargaBenih,
    },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField name={varietas.name} label={varietas.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitas.name}
            label={kuantitas.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputRupiah name={harga.name} label={harga.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputRupiah
            name={hargaBenih.name}
            label={hargaBenih.label}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <InputField name={umurBenih.name} label={umurBenih.label} fullWidth />
        </Grid> */}
        {/* <Grid item xs={12}>
          <InputField
            name={lamaPenyimpanan.name}
            label={lamaPenyimpanan.label}
            fullWidth
          />
        </Grid> */}
      </Grid>
    </>
  );
}
