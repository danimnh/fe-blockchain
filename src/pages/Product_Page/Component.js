import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
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
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import Meta from "components/Meta";

import useStyles from "./styles";

function ProductPage(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  // eslint-disable-next-line
  const [dataBlock, setDataBlock] = React.useState({});
  // eslint-disable-next-line
  const fetchDataByID = async (batchID) => {
    // eslint-disable-next-line
    const config = {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDIyYzA1NDI2NDM5MWQyMmJmNjRjMCIsImlhdCI6MTYwNzk2OTAzNiwiZXhwIjoxNjA4MTQxODM2fQ.bScY6Z45n6_2effUzKZMNK2uJ1zju0IjVR2-MfFsGJU",
      },
    };
    setIsLoading(true);
    try {
      let config = {
        headers: {
          Authorization:
            `Bearer ` +
            `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTY4NzQ3NzYsInVzZXJuYW1lIjoiYW50b1BrciIsIm9yZ05hbWUiOiJQZW5hbmdrYXIiLCJpYXQiOjE2MTY4Mzg3NzZ9.k11yX6Y3OCNoVXBDBv_1BG7YAXmI_7k3h4MKFQaBIGk`,
        },
        params: {
          peer: "peer0.penangkar.example.com",
          fcn: "GetHistoryForAssetByID",
          args:
            '["' +
            "01ce8e9b7f6a4f0a6de4399f3608aa31e9a995b2f996602451e9ed0086709ad4" +
            '"]',
        },
      };

      const resp = await axios.get(
        "http://35.240.236.209:4000/channels/mychannel/chaincodes/bawangmerah_cc",
        config
      );
      await console.log(resp);
      // await setDataBlock(resp.data);
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
        <Button onClick={() => props.history.goBack()}>{"<-"}</Button>
        <Grid direction="column" container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Detail Produk</Typography>

            <Grid container className={classes.rowDetail} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1">ID</Typography>
              </Grid>
              <Grid item xs={6}>
                <p>{props.match.params.batchId}</p>
              </Grid>
            </Grid>

            <Grid container className={classes.rowDetail} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1">Varietas</Typography>
              </Grid>
              <Grid item xs={6}>
                <p>{dataBlock.varietas}</p>
              </Grid>
            </Grid>

            <Grid container className={classes.rowDetail} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1">Tanggal Masuk</Typography>
              </Grid>
              <Grid item xs={6}>
                <p>{moment(dataBlock.timestamptoPetani).format("LL")}</p>
              </Grid>
            </Grid>

            <Grid container className={classes.rowDetail} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body1">Transaksi Terakhir</Typography>
              </Grid>
              <Grid item xs={6}>
                <p>{moment(dataBlock.timestamptoPetani).format("LLL")}</p>
              </Grid>
            </Grid>
          </Grid>

          {/* v grid closes */}
        </Grid>
        <Typography variant="h6">Transaksi</Typography>
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

        {dataBlock.timestamptoPetani && (
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
                  {moment(dataBlock.timestamptoPetani).format("LLL")}{" "}
                </Typography>
                <Typography gutterBottom>
                  Aktor : {dataBlock.usernamePenangkar}
                </Typography>
                <Typography variant="body2">{dataBlock.batchID}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </Container>
    </>
  );
}

export default ProductPage;
