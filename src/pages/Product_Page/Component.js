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

  const [dataBlock, setDataBlock] = React.useState({});
  const fetchWorldState = async (batchID) => {
    setIsLoading(true);
    try {
      const resp = await axios({
        method: "get",
        url: "http://13.229.214.74:8080/worldstate/" + batchID,
        headers: { "Content-Type": "application/json" },
      });
      await console.log(resp);
      await setDataBlock(resp.data);
      await setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const batchId = props.match.params.batchId;
    fetchWorldState(batchId);
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
