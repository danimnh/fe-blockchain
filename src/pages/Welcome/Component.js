import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import QrReader from "react-qr-reader";
import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// import { FaReact as ReactIcon } from "react-icons/fa";

import Meta from "components/Meta";

import useStyles from "./styles";

function Welcome(props) {
  const [qrRead, setqrRead] = useState("");
  const handleChange = (event) => {
    setqrRead(event.target.value);
  };
  const refreshingLayout = props.refreshLayout;
  // eslint-disable-line react-hooks/exhaustive-deps
  const matchSmallScreen = useMediaQuery("(max-width: 600px)");
  const classes = useStyles({ isSmallScreen: matchSmallScreen });
  const handleScan = (data) => {
    if (data) {
      setqrRead(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    refreshingLayout();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Meta
        title="Blockchain Supply Chain Bawang Merah IPB"
        description="Blockchain Supply Chain IPB"
      />
      <Container maxWidth="sm" className={classes.root}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px" }}
        />
        <p>atau</p>
        <TextField
          variant="outlined"
          placeholder="Masukkan Serial Number Produk"
          value={qrRead}
          onChange={handleChange}
          style={{ width: 300 }}
        />
        <Button
          variant="contained"
          component={RouterLink}
          to={"/product/" + qrRead}
          className={classes.button}
        >
          Telusuri
        </Button>
        {props.isLoggedIn && <p>Halo, {props.user.nama}!</p>}

        {!props.isLoggedIn && (
          <Button
            variant="outlined"
            component={RouterLink}
            to="/login"
            className={classes.button}
          >
            Masuk
          </Button>
        )}
        {!props.isLoggedIn && (
          <Button
            variant="outlined"
            component={RouterLink}
            to="/daftar"
            className={classes.button}
          >
            Buat Akun
          </Button>
        )}
      </Container>
    </>
  );
}

export default Welcome;
