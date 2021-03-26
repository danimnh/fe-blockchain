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
import DialogConfirmation from "../../sections/Dialog_Confirmation";
import PkrAddTrxFields from "./Form_Models/PkrAddTrxModels";
import FormPkrAddTrx from "./Forms/FormPkrAddTrx";
// import FetchApi from "../../constants/FetchApi";

const { PkrAddTrxFormFields } = PkrAddTrxFields;
// todo : username penerima checks out
function _renderStepContent() {
  return <FormPkrAddTrx PkrAddTrxFields={PkrAddTrxFormFields} />;
}

function Add_Genesis(props) {
  const classes = useStyles();
  const [modalContent, setModalContent] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  function createData(name, value) {
    return { name, value };
  }

  const rowsGenesis = [
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas (Kilogram)", modalContent.kuantitas),
    createData("Harga (Rupiah)", modalContent.harga),
    createData("Harga Benih (Rupiah)", modalContent.hargaBenih),
  ];

  const refreshingLayout = props.refreshLayout;

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    setModalContent(values);
    setVisible(true);
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
                  Tambah Asset
                </Button>
              </div>
              <DialogConfirmation
                rows={rowsGenesis}
                isVisible={visible}
                modalContent={modalContent}
                handleClose={() => {
                  setVisible(false);
                }}
                dialogTitle="Tambah Asset"
                fcnName="CreateBawang"
                // values={values}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default Add_Genesis;
