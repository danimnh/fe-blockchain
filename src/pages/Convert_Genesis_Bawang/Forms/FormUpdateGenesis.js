import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import moment from "moment";

import useStyles from "../styles";

import InputKilogram from "../../Sign_Up/FormFields/InputKilogram";

export default function FormUpdateGenesis(props) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = React.useState(0);

  const {
    UpdateGenesisFields: { kuantitasBawangKg },
  } = props;

  return (
    <>
      <Typography></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {props.genesisList.map((genesis) => {
            return (
              <Card
                key={genesis.Key}
                className={
                  isSelected === genesis.Key ? classes.selected : classes.card
                }
              >
                <CardActionArea
                  onClick={() => {
                    props.setFieldValue("prevID", genesis.Key);
                    props.setFieldValue("varietas", genesis.Record.varietas);
                    props.setFieldValue(
                      "kuantitasBenihKg",
                      genesis.Record.kuantitasBenihKg
                    );

                    setIsSelected(genesis.Key);
                  }}
                >
                  <CardContent>
                    <Typography className={classes.title}>
                      {genesis.Record.varietas}
                    </Typography>
                    <Typography>
                      Pengirim : {genesis.Record.usernamePengirim}
                    </Typography>
                    <Typography>
                      Tanggal Transaksi :{" "}
                      {moment
                        .unix(genesis.Record.createdAt)
                        .format("DD/MM/YYYY")}
                    </Typography>
                    <Typography>
                      Konversikan Benih : {genesis.Record.kuantitasBenihKg} Kg
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <InputKilogram
            name={kuantitasBawangKg.name}
            label={kuantitasBawangKg.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
