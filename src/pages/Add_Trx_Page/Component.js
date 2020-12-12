import React from "react";
import {
  Grid,
  Typography,
  Container,
  // Button,
  // Card,
  // CardContent,
  // CardActionArea,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";

import Meta from "components/Meta";

import useStyles from "./styles";

function AddTrx() {
  const classes = useStyles();

  return (
    <>
      <Meta title="Page 2" description="Page 2" />
      <Container maxWidth="sm" className={classes.root}>
        {" "}
        <Typography variant="h6">Tambah Transaksi</Typography>
        <Grid container className={classes.rowDetail} xs={12}>
          <Grid xs={12}>
            <Typography variant="body1">ID Produk</Typography>
          </Grid>
          <Grid xs={12}>
            <p>123123</p>
          </Grid>
        </Grid>
        <TextField type="text" placeholder="Kategori Transaksi" fullWidth />
        <TextField type="text" placeholder="Atribut" fullWidth />
      </Container>
    </>
  );
}

export default AddTrx;
