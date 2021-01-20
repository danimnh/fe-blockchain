import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
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

function ConfirmedList(props) {
  const classes = useStyles();
  const { listType } = props.match.params;
  const [confirmTrx] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  const refreshingLayout = props.refreshLayout;
  function createData(name, value) {
    return { name, value };
  }

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
  // const fetchPetaniSentConfirmed = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   };
  //   try {
  //     console.log(config);
  //     const resp = await axios.get("trx/ptn/confirmed/sent", config);
  //     await setConfirmTrx(resp.data.data);
  //     console.log(resp.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const fetchPenangkarSentConfirmed = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   };
  //   try {
  //     console.log(config);
  //     const resp = await axios.get("trx/pkr/confirmed/sent", config);
  //     await setConfirmTrx(resp.data.data);
  //     console.log(resp.data.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const fetchPetaniInboxConfirmed = async () => {
  //   console.log("fetch");
  // };

  useEffect(() => {
    refreshingLayout();

    // if (props.match.params.listType !==)
    const memberTypeFetch = localStorage.getItem("memberType");
    const trxType = "confirmed";
    const fetchTrx = async (memberType, trxType, mailType) => {
      console.log("trx/" + memberType + "/" + trxType + "/" + mailType);
      console.log(props.match);
    };
    fetchTrx(memberTypeFetch, trxType, props.match.params.listType);
    // const fetchSentTrx = async (memberType) => {
    //   console.log("fetchbytype");
    //   if (memberType === "penangkar") fetchPenangkarSentConfirmed();
    //   else if (memberType === "petani") fetchPetaniSentConfirmed();
    //   else if (memberType === "pengumpul") fetchPengumpulSentConfirmed();
    //   // else if (memberType === "pedagang") console.log("pdg");
    // };
    // const fetchInboxTrx = async (memberType) => {
    //   console.log("fetchbytype");
    //   // if (memberType === "penangkar") console.log("pkr");
    //   if (memberType === "petani") fetchPetaniInboxConfirmed();
    //   else if (memberType === "pengumpul") fetchPengumpulInboxConfirmed();
    //   else if (memberType === "pedagang") fetchPedagangInboxConfirmed();
    // };
    // if (props.match.params.listType == "Sent") fetchSentTrx(memberTypeFetch);
    // else fetchInboxTrx(memberTypeFetch);
    // eslint-disable-next-line
  }, [listType]);
  return (
    <>
      <Meta title="TransactionList" description="TransactionList" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Transaksi Terkonfirmasi</Typography>
        <Typography variant="h6">{props.match.params.listType}</Typography>
        <p>{props.user.memberType}</p>
        {confirmTrx.length === "0" ? (
          <p>Kamu memiliki {confirmTrx.length} transaksi terkonfirmasi </p>
        ) : (
          <p>Tidak ada transaksi terkonfirmasi {confirmTrx.length}</p>
        )}
        {confirmTrx.map((trx) => {
          return (
            <>
              <Card
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
                    <Typography>
                      {moment(trx.timestamp).format("LL")}
                    </Typography>
                    <Typography>batch id : {trx.batchID}</Typography>
                    <Typography>transaction id : {trx.transaksiID}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
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
                console.log("console log onClick");
              }}
              variant="outlined"
            >
              Konfirmasi
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default ConfirmedList;
