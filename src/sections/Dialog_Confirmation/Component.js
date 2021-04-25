import React from "react";
import useStyles from "./styles";
import QRCode from "qrcode.react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogContentText,
} from "@material-ui/core";
import FetchApi from "constants/FetchApi";
import InvokeTrxPkr from "constants/InvokeTrxPkr";

import AddBawangKuantitasByID from "constants/AddBawangKuantitasByID";
import { useHistory } from "react-router-dom";

function DialogConfirmation({
  rows,
  isVisible,
  fcnName,
  modalContent,
  dialogTitle,
  handleClose,
  user,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const [txid, setTxid] = React.useState("");
  const classes = useStyles();
  const [qrVisible, setQrVisible] = React.useState(false);
  return (
    <>
      <Dialog open={isVisible} onClose={handleClose}>
        <DialogTitle>Konfirmasi {dialogTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Informasi di bawah akan disimpan
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Atribut</TableCell>
                  <TableCell align="right">Informasi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Pengirim</TableCell>
                  <TableCell align="right">{user}</TableCell>
                </TableRow>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          {fcnName === "AddBawangKuantitasByID" ? (
            <Button
              onClick={() => {
                setIsLoading(true);
                handleClose();
                AddBawangKuantitasByID(modalContent, fcnName)
                  .then((result) => {
                    console.log(result);
                  })
                  .finally(() => {
                    setIsLoading(false);
                    history.replace("/create_transaction");
                  });
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          ) : fcnName === "CreateTrxBawangByPenangkar" ? (
            <Button
              onClick={() => {
                setIsLoading(true);
                handleClose();
                InvokeTrxPkr(modalContent, fcnName, user)
                  .then((result) => {
                    setTxid(result);
                    console.log(result);
                  })
                  .finally(() => {
                    setQrVisible(true);
                    setIsLoading(false);
                  });
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          ) : fcnName === "CreateTrxBawangByPetani" ? (
            <Button
              onClick={() => {
                setIsLoading(true);
                handleClose();
                FetchApi(modalContent, fcnName, user)
                  .then((result) => {
                    setTxid(result);
                    console.log(result);
                  })
                  .finally(() => {
                    setQrVisible(true);
                    setIsLoading(false);
                  });
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          ) : fcnName === "CreateTrxBawangByPetani" ? (
            <Button
              onClick={() => {
                setIsLoading(true);
                handleClose();
                FetchApi(modalContent, fcnName, user)
                  .then((result) => {
                    setTxid(result);
                    console.log(result);
                  })
                  .finally(() => {
                    setQrVisible(true);
                    setIsLoading(false);
                  });
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsLoading(true);
                handleClose();
                FetchApi(modalContent, fcnName, user)
                  .then((result) => {
                    setTxid(result);
                    console.log(result);
                  })
                  .finally(() => {
                    setQrVisible(true);
                    setIsLoading(false);
                  });
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={qrVisible}>
        <DialogTitle>Transaksi Berhasil Disimpan</DialogTitle>
        <DialogContent>
          <DialogContentText>QR Code Transaksi</DialogContentText>
          <QRCode value={txid} />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={async () => {
              await setQrVisible(false);
              await alert("Redirecting to product page");
              await history.push("/product/" + txid);
            }}
            variant="outlined"
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}
    </>
  );
}

export default DialogConfirmation;
