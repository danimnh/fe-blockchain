import React, { useEffect } from "react";
// import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import {
  // Grid,
  // Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import Meta from "components/Meta";

import useStyles from "./styles";

function TransactionList() {
  const classes = useStyles();
  const [pendingTrx, setPendingTrx] = React.useState([]);

  const fetchPendingTrx = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      console.log(config);
      const resp = await axios.get("trx/pkr-ptn/unconfirmed", config);
      await setPendingTrx(resp.data.data);
      console.log(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmByID = async (_id) => {
    const values = {
      trxID: _id,
    };
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      console.log(values);
      const resp = await axios.post("trx/pkr-ptn/confirm", values, config);
      await console.log(resp);
      await alert("transaksi " + _id + "berhasil dikonfirmasi");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPendingTrx();
  }, []);
  return (
    <>
      <Meta title="TransactionList" description="TransactionList" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Transaksi Pending</Typography>
        {pendingTrx.length === "0" ? (
          <p>Tidak ada transaksi pending</p>
        ) : (
          console.log("false?", pendingTrx)
        )}
        {pendingTrx.map((trx) => {
          return (
            <Card key={trx._id} style={{ marginBottom: "20px", width: "100%" }}>
              <CardActionArea onClick={() => confirmByID(trx._id)}>
                <CardContent>
                  <Typography>{trx.usernamePengirim}</Typography>
                  <Typography>{trx.timestamp}</Typography>
                  <Typography>{trx._id}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default TransactionList;
