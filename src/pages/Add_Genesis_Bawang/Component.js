import React, { useEffect } from "react";
// eslint-disable-next-line
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
import FormPkrAddTrx from "./Forms/FormPkrAddTrx";

const { PkrAddTrxFormFields } = PkrAddTrxFields;
// todo : username penerima checks out
function _renderStepContent() {
  return <FormPkrAddTrx PkrAddTrxFields={PkrAddTrxFormFields} />;
}

function Add_Genesis(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const args = {
    usernamePengirim: "ajiPkr",
    usernamePenerima: "baduPtn",
    alamatPengirim: "Brebes1",
    alamatPenerima: "Brebes2",
    kuantitasKg: 4.2,
    harga: "5000000",
    umurBenih: "2 bulan",
    umurPanen: "2 hari",
    varietas: "Bima Brebes",
    hargaBenih: 1500,
  };
  const refreshingLayout = props.refreshLayout;

  const FetchApi = async (values) => {
    // eslint-disable-next-line
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log(values);
    let body = {
      fcn: "CreateBawang",
      peers: [
        "peer0.penangkar.example.com",
        "peer0.petani.example.com",
        "peer0.pengumpul.example.com",
        "peer0.pedagang.example.com",
      ],
      chaincodeName: "bawangmerah_cc",
      channelName: "mychannel",
      args: values,
    };
    console.log(body);
    // API not ready

    // axios({
    //   method: "post",
    //   url: "/channel/" + body.channelName + "/chaincodes/" + body.chaincodeName,
    //   data: {
    //     args,
    //   },
    //   config: {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   },
    // });
  };

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);

    // console.log(args);
    // console.log(JSON.parse(values));
    FetchApi(values);
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
        <Typography variant="h6">Tambah Asset Benih</Typography>
        <Grid container className={classes.rowDetail} item xs={12}>
          <Grid item xs={12}>
            <p>
              Anda terdaftar sebagai <strong>{props.user.memberType}</strong>
            </p>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            varietas: "",
            kuantitas: "",
            harga: "",
            hargaBenih: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.varietas) {
              errors.varietas = "Varietas tidak boleh kosong";
            } else if (!values.kuantitas) {
              errors.kuantitas = "Kuantitas tidak boleh kosong";
            } else if (!values.harga) {
              errors.harga = "Harga tidak boleh kosong";
            } else if (!values.hargaBenih) {
              errors.hargaBenih = "Harga Benih tidak boleh kosong";
            }
            return errors;
          }}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              {_renderStepContent(props.user.memberType)}
              {/* TO-DO : Confirmation Popup */}
              <div className={classes.center}>
                <Button
                  className={classes.confirm}
                  disabled={!(isValid && dirty) || isSubmitting}
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

export default Add_Genesis;
