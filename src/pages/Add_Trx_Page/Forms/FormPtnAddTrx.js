import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";

export default function FormPtnAddTrx(props) {
  const {
    PtnAddTrxFields: {
      batchID,
      namaPenerima,
      alamatPengirim,
      alamatPenerima,
      kuantitas,
      harga,
      ukuranBenih,
      kadarAir,
      pupuk,
      pestisida,
      perlakuan,
    },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputField name={batchID.name} label={batchID.label} fullWidth />
          <InputField
            name={namaPenerima.name}
            label={namaPenerima.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={alamatPengirim.name}
            label={alamatPengirim.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={alamatPenerima.name}
            label={alamatPenerima.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={kuantitas.name} label={kuantitas.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={harga.name} label={harga.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={ukuranBenih.name}
            label={ukuranBenih.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={kadarAir.name} label={kadarAir.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={pupuk.name} label={pupuk.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={pestisida.name} label={pestisida.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={perlakuan.name} label={perlakuan.label} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}
