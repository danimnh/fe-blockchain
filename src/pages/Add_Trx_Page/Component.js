import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

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
import ReactJson from "react-json-view";

import { Formik, Form } from "formik";

import Meta from "components/Meta";

import useStyles from "./styles";
import getUsername from "../../constants/GetUsername";
import getUserOrgName from "../../constants/GetUserOrgName";
import fetchAllGenesis from "../../constants/fetchAllGenesis";
import fetchAllAssets from "../../constants/fetchAllAssets";

import PkrAddTrxFields from "./Form_Models/PkrAddTrxModels";
import PtnAddTrxFields from "./Form_Models/PtnAddTrxModels";
import PplAddTrxFields from "./Form_Models/PplAddTrxModels";

import FormPkrAddTrx from "./Forms/FormPkrAddTrx";
import FormPtnAddTrx from "./Forms/FormPtnAddTrx";
import FormPplAddTrx from "./Forms/FormPplAddTrx";

import DialogConfirmation from "../../sections/Dialog_Confirmation";

const { PkrAddTrxFormFields } = PkrAddTrxFields;
const { PtnAddTrxFormFields } = PtnAddTrxFields;
const { PplAddTrxFormFields } = PplAddTrxFields;

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
      return <FormPplAddTrx PplAddTrxFields={PplAddTrxFormFields} />;
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
    createData("Umur Panen", modalContent.umurPanen + " Hari"),
    createData("Lama Penyimpanan", modalContent.lamaPenyimpanan + " Hari"),
  ];

  const rowsPetani = [
    createData("Penerima", modalContent.usernamePenerima),
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas", modalContent.kuantitasBawangKg + " Kg"),
    createData("Harga Bawang", "Rp. " + modalContent.hargaBawangPerKg),
    createData("Pupuk", modalContent.pupuk),
    createData("Pestisida", modalContent.pestisida),
    createData("Kadar Air (%)", modalContent.kadarAir),
    createData("Perlakuan", modalContent.perlakuan),
    createData("Produktivitas", modalContent.produktivitas),
  ];

  const rowsPengumpul = [
    createData("Penerima", modalContent.usernamePenerima),
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas", modalContent.kuantitasBawangKg + " Kg"),
    createData("Harga Bawang", "Rp. " + modalContent.hargaBawangPerKg),
    createData("Tanggal Masuk", modalContent.tanggalMasuk),
    // createData("Alamat Gudang", modalContent.alamatGudang),
    createData("Teknik Sorting", modalContent.teknikSorting),
    createData("Metode Pengemasan", modalContent.metodePengemasan),
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
    } else if (user.orgName === "Petani") {
      values.hargaBawangPerKg = parseInt(values.hargaBawangPerKg);
      values.varietas = asset[0].Record.varietas;
      values.usernamePengirim = user.username;
    } else if (user.orgName === "Pengumpul") {
      values.hargaBawangPerKg = parseInt(values.hargaBawangPerKg);
      values.varietas = asset[0].Record.varietas;
      values.usernamePengirim = user.username;
    } else if (user.orgName === "Pedagang") {
      values.hargaBawangPerKg = parseInt(values.hargaBawangPerKg);
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

                          {user.orgName === "Penangkar" ? (
                            <Typography>
                              Aset saat ini : {asset.Record.kuantitasBenihKg} Kg
                            </Typography>
                          ) : (
                            <>
                              <Typography>
                                Tanggal Pengiriman :{" "}
                                {moment
                                  .unix(asset.Record.createdAt)
                                  .format("DD/MM/YYYY")}
                              </Typography>
                              <Typography>
                                Kuantitas Bawang :{" "}
                                {asset.Record.kuantitasBawangKg} Kg
                              </Typography>

                              <Typography>
                                Pengirim : {asset.Record.usernamePengirim}
                              </Typography>
                            </>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}

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
                  <ReactJson src={values} />

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

                            {user.orgName === "Penangkar" ? (
                              <Typography>
                                Aset saat ini :{" "}
                                {selectedAsset.Record.kuantitasBenihKg} Kg
                              </Typography>
                            ) : (
                              <>
                                <Typography>
                                  Kuantitas Bawang :{" "}
                                  {selectedAsset.Record.kuantitasBawangKg} Kg
                                </Typography>
                              </>
                            )}
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
              {user.orgName === "Penangkar" ? (
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
              ) : user.orgName === "Petani" ? (
                <DialogConfirmation
                  rows={rowsPetani}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Transaksi Penjualan Bawang"
                  fcnName="UpdateBawangTrxByPetani"
                  user={user.username}
                />
              ) : user.orgName === "Pengumpul" ? (
                <DialogConfirmation
                  rows={rowsPengumpul}
                  isVisible={visible}
                  modalContent={modalContent}
                  handleClose={() => {
                    setVisible(false);
                  }}
                  dialogTitle="Transaksi Penjualan Bawang"
                  fcnName="UpdateBawangTrxByPengumpul"
                  user={user.username}
                />
              ) : user.orgName === "Pedagang" ? (
                console.log("pdg")
              ) : (
                console.log("login")
              )}
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default AddTrx;
