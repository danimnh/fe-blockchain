import React from "react";
// import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

export default function InputField(props) {
  const [field] = useField(props);
  // console.log("field");

  // console.log(field);

  return (
    <>
      <NumberFormat
        {...props}
        value={field.value}
        customInput={TextField}
        prefix={"Rp."}
        // format={format || null}
        thousandSeparator
        {...field}
      />
    </>
  );
}
