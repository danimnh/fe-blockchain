import React from "react";
import { useFormikContext } from "formik";
import { Grid, Typography } from "@material-ui/core";
import InputField from "../FormFields/InputField";

export default function FormUserTypeDetail(props) {
  const {
    formField: { memberInfo },
  } = props;
  const { values: formValues } = useFormikContext();
  return (
    <>
      <Typography></Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <p>Info {formValues.memberType}</p>
          {formValues.memberType === "Petani" && (
            <>
              <InputField
                name={memberInfo.luasLahan.name}
                label={memberInfo.luasLahan.label}
                fullWidth
              />
              <InputField
                name={memberInfo.alamatLahan.name}
                label={memberInfo.alamatLahan.label}
                fullWidth
              />
              <InputField
                name={memberInfo.kelompokTani.name}
                label={memberInfo.kelompokTani.label}
                fullWidth
              />
            </>
          )}

          {formValues.memberType === "Penangkar" && (
            <>
              <InputField
                name={memberInfo.luasLahan.name}
                label={memberInfo.luasLahan.label}
                fullWidth
              />
              <InputField
                name={memberInfo.alamatLahan.name}
                label={memberInfo.alamatLahan.label}
                fullWidth
              />
              <InputField
                name={memberInfo.kelompokTani.name}
                label={memberInfo.kelompokTani.label}
                fullWidth
              />
            </>
          )}

          {formValues.memberType === "Pengumpul" && (
            <>
              <InputField
                name={memberInfo.alamatToko.name}
                label={memberInfo.alamatToko.label}
                fullWidth
              />
            </>
          )}

          {formValues.memberType === "Pedagang" && (
            <>
              <InputField
                name={memberInfo.alamatToko.name}
                label={memberInfo.alamatToko.label}
                fullWidth
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
