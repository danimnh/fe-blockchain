import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";

import {
  // Grid,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  // Modal,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import Meta from "components/Meta";

import useStyles from "./styles";

function PendingList(props) {
  const classes = useStyles();
  const refreshingLayout = props.refreshLayout;
  const { listType } = props.match.params;
  const [memberCode, setMemberCode] = React.useState("");
  const [pendingTrx, setPendingTrx] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);

  function createData(name, value) {
    return { name, value };
  }
  //To-Do : rows tiap aktor
  const rowsPetani = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData("Kuantitas", modalContent.kuantitas),
    createData("Harga", modalContent.harga),
    createData("Timestamp", moment(modalContent.timestamp).format("LL")),
    createData("Umur Benih", modalContent.umurBenih),
    createData("Umur Panen", modalContent.umurPanen),
    createData("Lama Penyimpanan", modalContent.lamaPenyimpanan),
    createData("Varietas", modalContent.varietas),
    createData("Harga Benih", modalContent.hargaBenih),
    createData("Status", modalContent.status),
    createData("Transaksi ID", modalContent.transaksiID),
    createData("Batch ID", modalContent.batchID),
  ];

  const inputTable = () => {};
  // const handleOpen = () => {
  //   setVisible(true);
  // };

  const handleClose = () => {
    setVisible(false);
  };
  // pkr, ptn, ppl, pdg
  // pending = unconfirmed, confirmed
  // inbox, sent

  const fetchTrx = async (memberType, trxIsPending, trxType) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      // console.log("trx/" + memberCode + "/" + trxIsPending + "/" + trxType);
      console.log(config);
      console.log("trx/" + memberCode + "/" + trxIsPending + "/" + trxType);
      const resp = await axios.get(
        "trx/" + memberCode + "/" + trxIsPending + "/" + trxType,
        config
      );
      await setPendingTrx(resp.data.data);
      console.log(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const confirmPetaniByID = async (_id) => {
  //   const values = {
  //     trxID: _id,
  //   };
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };
  //   try {
  //     console.log(JSON.stringify(values));
  //     const resp = await axios.post(
  //       "trx/pkr-ptn/confirm",
  //       JSON.stringify(values),
  //       config
  //     );
  //     await console.log(resp);
  //     await alert("transaksi " + _id + "berhasil dikonfirmasi");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const confirmJualBenih = async (trx) => {
  //   const values = {
  //     usernamePengirim: trx.usernamePengirim,
  //     usernamePenerima: trx.usernamePenerima,
  //     alamatPengirim: trx.alamatPengirim,
  //     alamatPenerima: trx.alamatPenerima,
  //     kuantitas: trx.kuantitas.toString(),
  //     harga: trx.harga.toString(),
  //     timestamp: trx.timestamp,
  //     umurBenih: trx.umurBenih,
  //     umurPanen: "TIDAK TERSEDIA",
  //     lamaPenyimpanan: trx.lamaPenyimpanan,
  //     varietas: trx.varietas,
  //     hargaBenih: trx.hargaBenih,
  //     status: trx.status,
  //     transaksiID: trx.transaksiID,
  //     batchID: trx.batchID,
  //   };

  //   const valueJSON = JSON.stringify(values);
  //   console.log("json", valueJSON);
  //   try {
  //     const resp = await axios({
  //       method: "post",
  //       url: "http://13.229.214.74:8080/jualBenih",
  //       data: valueJSON,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     await console.log(resp);
  //     await alert("batchID " + trx.batchID + " berhasil dikonfirmasi");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const fetchByType = async () => {
      if (listType === "Inbox") {
        fetchTrx(memberCode, "unconfirmed", "inbox");
      } else if (listType === "Sent") {
        setPendingTrx([]);
        fetchTrx(memberCode, "unconfirmed", "sent");
      }
    };
    if (props.user.memberType === undefined) {
      refreshingLayout();
    } else if (memberCode.length === 0) {
      if (props.user.memberType === "penangkar") setMemberCode("pkr");
      else if (props.user.memberType === "petani") setMemberCode("ptn");
      else if (props.user.memberType === "pengumpul") setMemberCode("ppl");
      else if (props.user.memberType === "pedagang") setMemberCode("pdg");
    } else if (memberCode.length === 3) {
      fetchByType();
    }
    // eslint-disable-next-line
  }, [listType, props.user.memberType, memberCode]);
  return (
    <>
      <Meta title="TransactionList" description="TransactionList" />
      <Container maxWidth="sm" className={classes.root}>
        {props.match.params.listType === "Inbox" ? (
          <Typography variant="h6">Kotak Masuk</Typography>
        ) : (
          <Typography variant="h6">Terkirim</Typography>
        )}

        <Typography variant="h6">Transaksi Tertunda</Typography>

        {pendingTrx.length !== 0 ? (
          <p>Kamu memiliki {pendingTrx.length} transaksi yang tertunda</p>
        ) : (
          <p>Tidak ada transaksi masuk</p>
        )}

        {pendingTrx.map((trx) => {
          return (
            <Card
              id={trx._id}
              key={trx._id}
              style={{ marginBottom: "20px", width: "100%" }}
            >
              <CardActionArea
                onClick={() => {
                  setModalContent(trx);
                  setVisible(true);
                  inputTable(trx);
                }}
              >
                <CardContent>
                  <Typography>
                    Pengiriman dari {trx.usernamePengirim}
                  </Typography>
                  <Typography>{moment(trx.timestamp).format("LL")}</Typography>
                  <Typography>batch id : {trx.batchID}</Typography>
                  <Typography>transaction id : {trx.transaksiID}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}

        <Dialog open={visible} onClose={handleClose}>
          <DialogTitle>Konfirmasi Transaksi</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Atribut</TableCell>
                    <TableCell align="right">Informasi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsPetani.map((row) => (
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
            <Button
              onClick={() => {
                handleClose();
              }}
              variant="outlined"
            >
              Tutup
            </Button>
            <Button
              onClick={() => {
                // confirmPetaniByID(modalContent._id);
                // confirmJualBenih(modalContent);
              }}
              variant="contained"
              color="primary"
            >
              Konfirmasi
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default PendingList;
