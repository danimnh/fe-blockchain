import React, { useEffect } from "react";

import {
  Typography,
  Container,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { Formik, Form } from "formik";

import Meta from "components/Meta";
import getUsername from "../../constants/GetUsername";
import fetchAllGenesisUnconverted from "../../constants/fetchAllGenesisUnconverted";
import useStyles from "./styles";
import DialogConfirmation from "../../sections/Dialog_Confirmation";
import UpdateGenesisFields from "./Form_Models/UpdateGenesisModels";
import FormUpdateGenesis from "./Forms/FormUpdateGenesis";

const { UpdateGenesisFormFields } = UpdateGenesisFields;
function ConvertGenesis() {
  const classes = useStyles();
  const [user, setUser] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [genesisList, setGenesisList] = React.useState([]);

  function createData(name, value) {
    return { name, value };
  }

  const rowsGenesis = [
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas Benih", modalContent.kuantitasBenihKg + " Kg"),
    createData("Jenis Pupuk", modalContent.pupuk),
  ];

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
    console.log(values);

    values.usernamePengirim = user;

    _submitForm(values, actions);
  }

  useEffect(() => {
    getUsername().then((result) => {
      setIsLoading(true);
      setUser(result);
      fetchAllGenesisUnconverted(result)
        .then((result) => {
          let sorted = result;
          const after = sorted.sort((a, b) =>
            a.Record.createdAt > b.Record.createdAt ? -1 : 1
          );
          setGenesisList([]);
          setGenesisList(after);

          setIsLoading(false);
        })
        .finally();
    });

    // eslint-disable-next-line
  }, []);
  // to get user {props.user.orgName}
  return (
    <>
      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}

      <Meta title="Add_Transaction" description="Add_Transaction" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Pencatatan Tanam Benih</Typography>
        {genesisList.length === 0 ? (
          <>
            <p>Anda belum memiliki aset Benih.</p>
          </>
        ) : (
          <>
            <Formik
              initialValues={{
                prevID: "",
                pupuk: "",
                varietas: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.prevID) {
                  errors.prevID = "Varietas tidak boleh kosong";
                } else if (!values.pupuk) {
                  errors.pupuk = "Pupuk tidak boleh kosong";
                }
                return errors;
              }}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting, dirty, isValid, setFieldValue }) => (
                <Form>
                  <FormUpdateGenesis
                    UpdateGenesisFields={UpdateGenesisFormFields}
                    genesisList={genesisList}
                    setFieldValue={setFieldValue}
                  />
                  <div className={classes.center}>
                    <Button
                      className={classes.confirm}
                      disabled={!(isValid && dirty) || isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Tambah Informasi Tanam Benih
                    </Button>
                  </div>
                  <DialogConfirmation
                    rows={rowsGenesis}
                    isVisible={visible}
                    modalContent={modalContent}
                    handleClose={() => {
                      setVisible(false);
                    }}
                    dialogTitle="Tanam Bawang"
                    fcnName="PlantBenih"
                    user={user}
                  />
                </Form>
              )}
            </Formik>
          </>
        )}
      </Container>
    </>
  );
}

export default ConvertGenesis;
