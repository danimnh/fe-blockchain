import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";

import {
  Grid,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
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
} from "@material-ui/core";
import QRCode from "qrcode.react";
import Meta from "components/Meta";
import { useHistory } from "react-router-dom";

import getUsername from "../../constants/GetUsername";
import getUserOrgName from "../../constants/GetUserOrgName";

import useStyles from "./styles";

function InboxTrx(props) {
  const classes = useStyles();
  const { listType } = props.match.params;
  const [memberCode, setMemberCode] = React.useState("");
  const [user, setUser] = React.useState({ username: "", orgName: "" });
  const [inboxTrx, setInboxTrx] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  const history = useHistory();

  function createData(name, value) {
    return { name, value };
  }
  const rowsPenangkar = [
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

  const rowsPengumpul = [
    createData("Username Pengirim", modalContent.usernamePengirim),
    createData("Username Penerima", modalContent.usernamePenerima),
    createData("Alamat Pengirim", modalContent.alamatPengirim),
    createData("Alamat Penerima", modalContent.alamatPenerima),
    createData("Kuantitas", modalContent.kuantitas),
    createData("Harga", modalContent.harga),
    createData("Timestamp", moment(modalContent.timestamp).format("LL")),
    createData("Kadar Air", modalContent.kadarAir),
    createData("Pupuk", modalContent.pupuk),
    createData("Pestisida", modalContent.pestisida),
    createData("Perlakuan", modalContent.perlakuan),
    createData("Status", modalContent.status),
    createData("Transaksi ID", modalContent.transaksiID),
    createData("Batch ID", modalContent.batchID),
  ];
  const rowsPedagang = [
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

  const handleClose = () => {
    setVisible(false);
  };

  // pkr, ptn, ppl, pdg
  // confirmed
  // inbox, sent

  const fetchAllInboxTrx = async (trxType, username, isConfirmed) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
        params: {
          peer: "peer0.penangkar.example.com",
          fcn: "GetBawangForQuery",
          args:
            '["' +
            '{\\"selector\\":{\\"username' +
            trxType +
            '\\":\\"' +
            username +
            '\\",\\"isConfirmed\\":' +
            isConfirmed +
            "}}" +
            '"]',
        },
      };
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
        config
      );
      console.log(resp);
      console.log(config.params);
      return resp.data.result;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  const confirmTrxByID = async (trxId) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    console.log("confirmTrxById");

    let body = {
      fcn: "ConfirmTrxByID",
      peers: [
        "peer0.penangkar.example.com",
        "peer0.petani.example.com",
        "peer0.pengumpul.example.com",
        "peer0.pedagang.example.com",
      ],
      chaincodeName: "bawangmerah_cc",
      channelName: "mychannel",
      args: [trxId],
    };
    try {
      const resp = await axios.post(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
        body,
        config
      );
      console.log(resp);
      await alert("Transaksi berhasil dikonfirmasi");
      history.go(0);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
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
            console.log(stateCopy);
            setUser(stateCopy);
          })
          .finally(() => {
            setMemberCode(user.orgName);
            if (listType === "pending") {
              fetchAllInboxTrx("Penerima", user.username, "false").then(
                (result) => {
                  let sorted = result;
                  console.log("INBOX PENDING");
                  const after = sorted.sort((a, b) =>
                    a.Record.createdAt > b.Record.createdAt ? -1 : 1
                  );
                  setInboxTrx([]);
                  setInboxTrx(after);
                }
              );
            } else if (listType === "confirmed") {
              fetchAllInboxTrx("Penerima", user.username, "true").then(
                (result) => {
                  let sorted = result;
                  console.log("INBOX CONFIRMED");
                  const after = sorted.sort((a, b) =>
                    a.Record.createdAt > b.Record.createdAt ? -1 : 1
                  );

                  setInboxTrx([]);
                  setInboxTrx(after);
                }
              );
            }
          });
      });
    // eslint-disable-next-line
  }, [listType]);
  return (
    <>
      <Meta title="TransactionList" description="TransactionList" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Transaksi Masuk</Typography>

        {props.match.params.listType === "pending" ? (
          <Typography variant="h6">Tertunda</Typography>
        ) : (
          <Typography variant="h6">Terkonfirmasi</Typography>
        )}

        {inboxTrx.length !== 0 ? (
          <p>Kamu memiliki {inboxTrx.length} transaksi tertunda </p>
        ) : (
          <p>Tidak ada transaksi masuk</p>
        )}

        {inboxTrx.map((trx) => {
          return (
            <>
              <Card
                id={trx.Key}
                key={trx.Record.id}
                style={{ marginBottom: "20px", width: "100%" }}
              >
                <CardActionArea
                  onClick={() => {
                    console.log(trx.Record);
                    setModalContent(trx.Record);
                    setVisible(true);
                  }}
                >
                  <CardContent>
                    <Grid
                      direction="row"
                      container
                      style={{ justifyContent: "space-between" }}
                    >
                      <Grid>
                        <Typography className={classes.title}>
                          Pengiriman dari {trx.Record.usernamePengirim}
                        </Typography>

                        <Typography>
                          {moment.unix(trx.Record.createdAt).format("LL")}
                        </Typography>
                        <Typography>{trx.Record.varietas}</Typography>
                      </Grid>
                      <QRCode value={trx.Record.id} size={52} />
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          );
        })}
        <Dialog open={visible} onClose={handleClose}>
          <DialogTitle>Detail Transaksi</DialogTitle>
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
                  {memberCode === "Petani"
                    ? rowsPenangkar.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))
                    : memberCode === "Pengumpul"
                    ? rowsPetani.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))
                    : memberCode === "Pedagang"
                    ? rowsPengumpul.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))
                    : rowsPedagang.map((row) => (
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
            {listType === "pending" && (
              <Button
                onClick={() => {
                  console.log(modalContent.id);
                  confirmTrxByID(modalContent.id);
                }}
                variant="contained"
                color="primary"
              >
                Konfirmasi
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default InboxTrx;
