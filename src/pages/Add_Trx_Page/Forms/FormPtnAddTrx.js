import React from "react";
import { Grid } from "@material-ui/core";
import InputField from "../../Sign_Up/FormFields/InputField";
import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";
import InputRupiah from "../../Sign_Up/FormFields/InputRupiah";

export default function FormPtnAddTrx(props) {
  const {
    PtnAddTrxFields: {
      usernamePenerima,
      kuantitasBawangKg,
      hargaBawangPerKg,
      ukuranUmbi,
      pupuk,
      pestisida,
      kadarAir,
      perlakuan,
      produktivitas,
    },
  } = props;

  return (
    <div style={{ paddingTop: 20 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitasBawangKg.name}
            label={kuantitasBawangKg.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputRupiah
            name={hargaBawangPerKg.name}
            label={hargaBawangPerKg.label}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={ukuranUmbi.name}
            label={ukuranUmbi.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={pupuk.name} label={pupuk.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={pestisida.name} label={pestisida.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={kadarAir.name} label={kadarAir.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={perlakuan.name} label={perlakuan.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={produktivitas.name}
            label={produktivitas.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={usernamePenerima.name}
            label={usernamePenerima.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}
