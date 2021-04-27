import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  Typography,
  Container,
  Button,
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
// import ReactJson from "react-json-view";

import { Formik, Form } from "formik";

import Meta from "components/Meta";

import useStyles from "./styles";
import getUsername from "../../constants/GetUsername";
import getUserOrgName from "../../constants/GetUserOrgName";
import fetchAllGenesis from "../../constants/fetchAllGenesis";
import fetchAllAssets from "../../constants/fetchAllAssets";

import PkrAddTrxFields from "./Form_Models/PkrAddTrxModels";
import PtnAddTrxFields from "./Form_Models/PtnAddTrxModels";
import FormPkrAddTrx from "./Forms/FormPkrAddTrx";
import FormPtnAddTrx from "./Forms/FormPtnAddTrx";

import DialogConfirmation from "../../sections/Dialog_Confirmation";

const { PkrAddTrxFormFields } = PkrAddTrxFields;
const { PtnAddTrxFormFields } = PtnAddTrxFields;

// todo : username penerima checks out
function _renderStepContent(orgName) {
  switch (orgName) {
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
// eslint-disable-next-line
function _determineInitialValue(orgName) {
  switch (orgName) {
    case "Penangkar": {
      const initialValuePkr = { prevID: "" };
      return initialValuePkr;
    }
    case "Petani": {
      const initialValuePtn = { prevID: "" };
      return initialValuePtn;
    }

    case "Pengumpul": {
      const initialValuePpl = { prevID: "" };
      return initialValuePpl;
    }

    case "Pedagang": {
      const initialValuePdg = { prevID: "" };
      return initialValuePdg;
    }

    case "admin": {
      return <h1>admin</h1>;
    }

    default:
  }
}

function AddTrx() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(0);
  const [visible, setVisible] = React.useState(false);

  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [modalContent, setModalContent] = React.useState([]);

  const [asset, setAsset] = React.useState([]);
  const [selectedAsset, setSelectedAsset] = React.useState([]);

  const rowsPenangkar = [
    createData("Penerima", modalContent.usernamePenerima),
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas", modalContent.kuantitasBenihKg + " Kg"),
    createData("Harga Benih", "Rp. " + modalContent.hargaBenihPerKg),
    createData("Umur Benih", modalContent.umurBenih + " Hari"),
    createData("Lama Penyimpanan", modalContent.lamaPenyimpanan + " Hari"),
  ];

  function createData(name, value) {
    return { name, value };
  }

  const [prevID, setPrevID] = React.useState("");

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);

    console.log(values, actions);
    setModalContent(values);
    setVisible(true);
  }
  function _handleSubmit(values, actions) {
    console.log(user);
    if (user.orgName === "Penangkar") {
      values.hargaBenihPerKg = parseInt(values.hargaBenihPerKg);
      values.varietas = asset[0].Record.varietas;
      values.usernamePengirim = user.username;
    }
    //todo: aktor lain
    _submitForm(values, actions);
  }
  const initialValue = {
    prevID: "",
    usernamePenerima: "",
  };
  useEffect(() => {
    setIsLoading(true);
    getUsername()
      .then((result) => {
        let stateCopy = user;
        stateCopy.username = result;
        setUser(stateCopy);
      })
      .finally(() => {
        getUserOrgName()
          .then((result) => {
            let stateCopy = user;
            stateCopy.orgName = result;
            setUser(stateCopy);
          })
          .finally(() => {
            if (user.orgName === "Penangkar") {
              fetchAllGenesis(user.username).then((result) => {
                setAsset(result);
                setIsLoading(false);
              });
            } else {
              fetchAllAssets(user.username, true).then((result) => {
                setAsset(result);
                setIsLoading(false);
              });
            }
          });
      });
    // eslint-disable-next-line
  }, []);
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
      <Container maxWidth="sm">
        <Typography variant="h6">Tambah Transaksi</Typography>
        <Grid container className={classes.rowDetail} item xs={12}>
          <Grid item xs={12}>
            <p>
              Anda terdaftar sebagai <strong>{user.orgName}</strong>
            </p>
          </Grid>
        </Grid>

        <Formik initialValues={initialValue} onSubmit={_handleSubmit}>
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              {values.prevID === "" &&
                asset.map((asset) => {
                  return (
                    <Card
                      key={asset.Key}
                      className={
                        isSelected === asset.Key
                          ? classes.selected
                          : classes.card
                      }
                    >
                      <CardActionArea
                        onClick={() => {
                          setPrevID(asset.Key);
                          setSelectedAsset(asset);
                          setIsSelected(asset.Key);
                        }}
                      >
                        <CardContent>
                          <Typography className={classes.title}>
                            {asset.Record.varietas}
                          </Typography>
                          <Typography>
                            Aset saat ini : {asset.Record.kuantitasBenihKg} Kg
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}

              {/* TO-DO : Confirmation Popup */}
              {asset.length === 0 ? (
                <>
                  <p>Anda tidak memiliki aset</p>
                  <Button
                    className={classes.confirm}
                    component={RouterLink}
                    to="/"
                    variant="contained"
                    color="primary"
                  >
                    Kembali ke halaman awal
                  </Button>
                </>
              ) : (
                <>
                  {/* <ReactJson src={values} /> */}

                  {values.prevID === "" ? (
                    <Button
                      onClick={() => {
                        setFieldValue("prevID", prevID);
                      }}
                      className={classes.confirm}
                      variant="contained"
                      color="primary"
                      // type="submit"
                    >
                      Pilih Aset
                    </Button>
                  ) : (
                    <>
                      <Card
                        className={
                          isSelected === selectedAsset.Key
                            ? classes.selected
                            : classes.card
                        }
                      >
                        <CardActionArea
                          onClick={() => {
                            setIsSelected("");
                            setFieldValue("prevID", "");
                          }}
                        >
                          <CardContent>
                            <Typography className={classes.title}>
                              <strong>{selectedAsset.Record.varietas}</strong>
                            </Typography>
                            <Typography>
                              Aset saat ini :{" "}
                              {selectedAsset.Record.kuantitasBenihKg} Kg
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>

                      {values.prevID !== "" && _renderStepContent(user.orgName)}

                      <Button
                        className={classes.confirm}
                        disabled={
                          values.usernamePenerima === "" ||
                          values.kuantitasBenihKg === "" ||
                          isSubmitting
                        }
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Konfirmasi
                      </Button>
                    </>
                  )}
                </>
              )}
              <DialogConfirmation
                rows={rowsPenangkar}
                isVisible={visible}
                modalContent={modalContent}
                handleClose={() => {
                  setVisible(false);
                }}
                dialogTitle="Transaksi Penjualan Benih"
                fcnName="CreateTrxBawangByPenangkar"
                user={user.username}
              />
              {/* {user.orgName === "Penangkar" && (
                  <>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      color="primary"
                      to="/add_genesis"
                      className={classes.button}
                    >
                      Tambahkan Benih Baru
                    </Button>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      color="primary"
                      to="/update_genesis"
                      className={classes.button}
                    >
                      Atur Aset Benih
                    </Button>
                  </>
                )} */}
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default AddTrx;
