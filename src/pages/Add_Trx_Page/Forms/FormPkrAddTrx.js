import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";

export default function FormPkrAddTrx(props) {
  const {
    PkrAddTrxFields: {
      namaPenerima,
      alamatPengirim,
      alamatPenerima,
      kuantitas,
      harga,
      umurBenih,
      lamaPenyimpanan,
      varietas,
      hargaBenih,
    },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
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
          <InputField name={umurBenih.name} label={umurBenih.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={lamaPenyimpanan.name}
            label={lamaPenyimpanan.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={varietas.name} label={varietas.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={hargaBenih.name}
            label={hargaBenih.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
