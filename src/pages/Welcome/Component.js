import React, { useState } from "react";

import QrReader from "react-qr-reader";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { FaReact as ReactIcon } from "react-icons/fa";

import Meta from "components/Meta";

import useStyles from "./styles";

function Welcome() {
  const [qrRead, setqrRead] = useState("");
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
  return (
    <>
      <Meta
        title="Blockchain Supply Chain Bawang Merah IPB"
        description="Blockchain Supply Chain IPB"
      />
      <Container maxWidth="md" className={classes.root}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px" }}
        />
        <p>atau</p>
        <TextField variant="outlined" value={qrRead} />
        <Button>Masuk</Button>
        <Button>Buat Akun</Button>
      </Container>
    </>
  );
}

export default Welcome;
