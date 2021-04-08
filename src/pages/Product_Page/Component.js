import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import QRCode from "qrcode.react";
import ReactJson from "react-json-view";
import {
  Grid,
  // Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import Meta from "components/Meta";

import useStyles from "./styles";

function ProductPage(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  function createData(name, value) {
    return { name, value };
  }

  let modalContent = {
    id: "fdc1e8a3d82d003ca18ceb0d6f6d4ccef54d7970d67e90f05cfa1afff1e51e3e",
    genesisID: "",
    usernamePengirim: "",
    usernamePenerima: "",
    alamatPengirim: "",
    alamatPenerima: "",
    kuantitasBenihKg: 0,
    hargaBenihPerKg: 0,
    hargaBenihTotal: 0,
    kuantitasBawangKg: 0,
    hargaBawangPerKg: 0,
    hargaBawangTotal: 0,
    createdAt: 1617797595,
    umurBenih: "",
    umurPanen: "",
    lamaPenyimpanan: "",
    varietas: "",
    ukuranUmbi: "",
    kadarAirPersen: 0,
    pupuk: "",
    pestisida: "",
    perlakuan: "",
    produktivitas: "",
    tanggalMasuk: "",
    alamatGudang: "",
    teknikSorting: "",
    metodePengemasan: "",
    txID1: "",
    txID2: "",
    txID3: "",
    isGenesis: false,
    isConfirmed: false,
  };
  // eslint-disable-next-line
  const rowsGenesis = [
    createData("Varietas", modalContent.varietas),
    createData("Kuantitas", modalContent.kuantitasBenihKg + " Kg"),
    createData("Harga Benih", "Rp. " + modalContent.hargaBenihPerKg),
    createData("Umur Benih", modalContent.umurBenih + " Hari"),
    createData("Umur Panen", modalContent.umurPanen + " Hari"),
  ];
  // eslint-disable-next-line
  const rowsPetani = [
    createData("ukuranUmbi", modalContent.ukuranUmbi),
    createData("KadarAirPersen", modalContent.kadarAirPersen),
    createData("Pupuk", +modalContent.pupuk),
    createData("pestisida", modalContent.pestisida),
    createData("perlakuan", modalContent.perlakuan),
    createData("produktivitas", modalContent.produktivitas),
  ];
  // eslint-disable-next-line
  const rowsPengumpul = [
    createData("tanggalMasuk", modalContent.usernamePenerima),
    createData("alamatPenerima", modalContent.alamatPenerima),

    createData("tanggalMasuk", modalContent.tanggalMasuk),
    createData("alamatGudang", modalContent.alamatGudang),
    createData("teknikSorting", +modalContent.teknikSorting),
    createData("metodePengemasan", modalContent.metodePengemasan),
  ];

  // const rowsPedagang = [];

  // eslint-disable-next-line
  const [dataBlock1, setDataBlock1] = React.useState({});
  // const [dataBlock2, setDataBlock2] = React.useState({}); //txid1
  // const [dataBlock3, setDataBlock3] = React.useState({}); //txid2
  // const [dataBlock4, setDataBlock4] = React.useState({}); //txid3

  // eslint-disable-next-line
  const fetchDataByID = async (batchID) => {
    setIsLoading(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
        params: {
          peer: "peer0.penangkar.example.com",
          fcn: "GetHistoryForAssetByID",
          args: '["' + batchID + '"]',
        },
      };
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
        config
      );
      // await console.log(resp.data.result);

      // await console.log(resp.data.result[0].Value);
      // await console.log(dataBlock1);
      await setIsLoading(false);

      return resp.data.result[0].Value;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const batchId = props.match.params.batchId;

    fetchDataByID(batchId).then((result) => {
      setDataBlock1(result);
      if (result.txID1 !== "") {
        console.log("kosong");
      }

      // if (result !== "") {
      //   console.log("isi");
      // }
    });
  }, [props.match.params.batchId]);
  return (
    <>
      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}
      <Meta title="Page 4" description="Page 4" />
      <Container maxWidth="sm" className={classes.root}>
        <Grid direction="column" container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Detail Transaksi</Typography>

            <Grid container className={classes.rowDetail} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1">QR Code</Typography>
                {dataBlock1.id !== undefined && (
                  <QRCode value={dataBlock1.id} />
                )}
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>

            <Grid container className={classes.rowDetail} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1">Pelaku Transaksi</Typography>
              </Grid>
              <Grid item xs={6}>
                <p>{dataBlock1.usernamePengirim}</p>
              </Grid>
            </Grid>

            <Grid container className={classes.rowDetail} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1">Tanggal Masuk</Typography>
              </Grid>
              <Grid item xs={6}>
                <p>{moment.unix(dataBlock1.createdAt).format("LLL")}</p>
              </Grid>
            </Grid>

            <Grid container className={classes.rowDetail} item xs={12}>
              {dataBlock1.isGenesis && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="body1">Varietas</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <p>{dataBlock1.varietas}</p>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          {/* v grid closes */}
        </Grid>
        <Typography variant="h6">Transaksi</Typography>

        <ReactJson src={dataBlock1} theme="monokai" />
        {/* {true && (
          <Button
            className={{ width: "300px", marginTop: 10 }}
            fullWidth
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/addNew"
          >
            Tambah Transaksi
          </Button>
        )} */}

        {dataBlock1.timestamptoPetani && (
          <Card className={classes.cardContainer}>
            <CardActionArea
            // component={RouterLink}
            // to={{
            //   pathname:
            //     "/product/" +
            //     props.match.params.batchId +
            //     "/details/" +
            //     dataBlock.batchID.toString(),
            //   trxProps: dataBlock,
            // }}
            >
              <CardContent>
                <Typography>
                  {moment(dataBlock1.timestamptoPetani).format("LLL")}{" "}
                </Typography>
                <Typography gutterBottom>
                  Aktor : {dataBlock1.usernamePenangkar}
                </Typography>
                <Typography variant="body2">{dataBlock1.batchID}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </Container>
    </>
  );
}

export default ProductPage;
