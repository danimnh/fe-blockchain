import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Meta from "components/Meta";

import useStyles from "./styles";

function ProductPage({ match }) {
  const classes = useStyles();

  return (
    <>
      <Meta title="Page 4" description="Page 4" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h3">
          Product Page that takes id : {match.params.batchId}
        </Typography>
        {/* <p>
          <strong>Match Props: </strong>
          <code>{JSON.stringify(match, null, 2)}</code>
        </p>
        <p>
          <strong>Location Props: </strong>
          <code>{JSON.stringify(location, null, 2)}</code>
        </p> */}
      </Container>
    </>
  );
}

export default ProductPage;
