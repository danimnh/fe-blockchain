import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import axios from "axios";

import {
  Grid,
  Typography,
  Container,
  Button,
  // Card,
  // CardContent,
  // CardActionArea,
} from "@material-ui/core";

import { Formik, Form } from "formik";

import Meta from "components/Meta";

import useStyles from "./styles";
import PkrAddTrxFields from "./Form_Models/PkrAddTrxModels";
import PtnAddTrxFields from "./Form_Models/PtnAddTrxModels";
import FormPkrAddTrx from "./Forms/FormPkrAddTrx";
import FormPtnAddTrx from "./Forms/FormPtnAddTrx";

const { PkrAddTrxFormFields } = PkrAddTrxFields;
const { PtnAddTrxFormFields } = PtnAddTrxFields;
// todo : username penerima checks out
function _renderStepContent(memberType) {
  switch (memberType) {
    case "Penangkar":
      return <FormPkrAddTrx PkrAddTrxFields={PkrAddTrxFormFields} />;
    // return <h1>penangkar</h1>;
    case "Petani":
      return <FormPtnAddTrx PtnAddTrxFields={PtnAddTrxFormFields} />;
    // return <h1>petani</h1>;
    case "Pengumpul":
      return <h1>Pengumpul</h1>;
    case "Pedagang":
      return <h1>Pedagang</h1>;
    // return <FormUserTypeDetail formField={formField} />;
    case "admin":
      return <h1>admin</h1>;
    default:
  }
}

function AddTrx(props) {
  const classes = useStyles();
  const refreshingLayout = props.refreshLayout;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    // alert(JSON.stringify(values), null, 2);
    if (props.user.memberType === "penangkar") {
      console.log("json" + values);
      try {
        const resp = await axios.post("trx/pkr-ptn", values, config);
        console.log("waiting for resp");
        console.log(resp);
        alert(resp.data.message);
        alert(resp.data.data.batchID);
      } catch (err) {
        console.log(err);
      }
    } else if (props.user.memberType === "petani") {
      console.log("petani submit add");
      console.log(values);
      try {
        // const resp = await axios.post("trx/ptn-ppl", values, config);
        // console.log("waiting for resp");
        // console.log(resp);
        // alert(resp.data.message);
        // alert(resp.data.data.batchID);
      } catch (err) {
        console.log(err);
      }
    } else if (props.user.memberType === "pengumpul") {
      console.log("pengumpul");
    }
    actions.setSubmitting(false);
  }
  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
  }
  useEffect(() => {
    refreshingLayout();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta title="Add_Transaction" description="Add_Transaction" />
      <Container maxWidth="sm" className={classes.root}>
        {" "}
        <Typography variant="h6">Tambah Transaksi</Typography>
        <Grid container className={classes.rowDetail} item xs={12}>
          <Grid item xs={12}>
            <p>
              Anda terdaftar sebagai <strong>{props.user.orgName}</strong>
            </p>
            {props.user.orgName === "Penangkar" && (
              <>
                <Button
                  variant="contained"
                  component={RouterLink}
                  color="primary"
                  to="/add_genesis"
                  className={classes.button}
                >
                  Tambahkan Benih Baru
                </Button>
                <Button
                  variant="contained"
                  component={RouterLink}
                  color="primary"
                  to="/update_genesis"
                  className={classes.button}
                >
                  Atur Aset Benih
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <Formik initialValues={{ batchID: "" }} onSubmit={_handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {_renderStepContent(props.user.orgName)}
              {/* TO-DO : Confirmation Popup */}
              <div className={classes.center}>
                <Button
                  className={classes.confirm}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Konfirmasi
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default AddTrx;
