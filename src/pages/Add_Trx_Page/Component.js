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

function AddTrx() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(0);

  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [asset, setAsset] = React.useState([]);
  const [prevID, setPrevID] = React.useState("");

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    console.log(values, actions);
  }
  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
  }

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
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Tambah Transaksi</Typography>
        <Grid container className={classes.rowDetail} item xs={12}>
          <Grid item xs={12}>
            <p>
              Anda terdaftar sebagai <strong>{user.orgName}</strong>
            </p>
          </Grid>
        </Grid>
        <Formik initialValues={{ prevID: "" }} onSubmit={_handleSubmit}>
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
              {values.prevID !== "" && _renderStepContent(user.orgName)}

              {/* TO-DO : Confirmation Popup */}
              {/* <ReactJson src={asset} /> */}
              <div className={classes.center}>
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
                      <Button
                        className={classes.confirm}
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Konfirmasi
                      </Button>
                    )}
                  </>
                )}

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
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default AddTrx;
