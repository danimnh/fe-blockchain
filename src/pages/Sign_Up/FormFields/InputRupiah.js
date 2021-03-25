import React from "react";
// import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

import InputAdornment from "@material-ui/core/InputAdornment";

export default function InputField(props) {
  const [field] = useField(props);
  // console.log("field");

  // console.log(field);

  return (
    <>
      <NumberFormat
        {...props}
        value={field.value}
        variant="outlined"
        customInput={TextField}
        autoComplete="off"
        // format={format || null}
        thousandSeparator
        type="tel"
        allowNegative={false}
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
        }}
        {...field}
      />
    </>
  );
}
