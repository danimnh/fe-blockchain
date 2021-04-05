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

  // eslint-disable-next-line
  const [dataBlock1, setDataBlock1] = React.useState({});
  // const [dataBlock2, setDataBlock2] = React.useState({});
  // const [dataBlock3, setDataBlock3] = React.useState({});
  // const [dataBlock4, setDataBlock4] = React.useState({});

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
      console.log(config);
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
        config
      );
      await console.log(resp);

      await console.log(resp.data.result[0].Value);
      await setDataBlock1(resp.data.result[0].Value);
      // await console.log(dataBlock1);
      await setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const batchId = props.match.params.batchId;

    fetchDataByID(batchId);
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
