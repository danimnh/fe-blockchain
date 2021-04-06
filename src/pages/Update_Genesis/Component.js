import React, { useEffect } from "react";
import axios from "axios";

import {
  // Grid,
  Typography,
  Container,
  Button,
  // Card,
  // CardContent,
  // CardActionArea,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { Formik, Form } from "formik";

import Meta from "components/Meta";
import getUsername from "../../constants/GetUser";
import useStyles from "./styles";
import DialogConfirmation from "../../sections/Dialog_Confirmation";
import UpdateGenesisFields from "./Form_Models/UpdateGenesisModels";
import FormUpdateGenesis from "./Forms/FormUpdateGenesis";

const { UpdateGenesisFormFields } = UpdateGenesisFields;

function _renderStepContent() {
  return <FormUpdateGenesis UpdateGenesisFields={UpdateGenesisFormFields} />;
}

function Update_Genesis(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalContent, setModalContent] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [genesisList, setGenesisList] = React.useState([]);

  function createData(name, value) {
    return { name, value };
  }

  const rowsGenesis = [
    createData("Varietas", modalContent.genesisID),
    createData("Kuantitas (Kilogram)", modalContent.kuantitasBenihKg),
  ];

  const refreshingLayout = props.refreshLayout;
  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    setModalContent(values);
    setVisible(true);
    actions.setSubmitting(false);
  }

  function _handleSubmit(values, actions) {
    console.log(values);
    _submitForm(values, actions);
  }

  const fetchAllGenesis = async (props) => {
    setIsLoading(true);
    console.log(props);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
        params: {
          peer: "peer0.penangkar.example.com",
          fcn: "GetBawangForQuery",
          args:
            '["' +
            '{\\"selector\\":{\\"usernamePengirim\\":\\"' +
            props +
            '\\", \\"isGenesis\\":true}}' +
            '"]',
        },
      };
      const resp = await axios.get(
        "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
        config
      );
      // await console.log(config.params.args);
      // await console.log(props);

      await console.log(resp.data.result);

      // await console.log(resp.data.result[0].Value);
      await setGenesisList(resp.data.result);
      // await console.log(dataBlock1);
      await setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // if (user.length === undefined) {
  //   fetchAllGenesis(user);
  //   console.log("aazz");
  // }
  useEffect(() => {
    refreshingLayout();
    getUsername().then((result) => {
      fetchAllGenesis(result);
    });

    // eslint-disable-next-line
  }, []);
  // to get user {props.user.orgName}
  return (
    <>
      {isLoading && (
        <>
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        </>
      )}

      <Meta title="Add_Transaction" description="Add_Transaction" />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h6">Update Asset Bawang</Typography>
        <Typography variant="h6">{props.user.username}</Typography>
        {genesisList.map((genesis) => {
          return (
            <>
              <p>{genesis.Record.varietas}</p>
            </>
          );
        })}

        <Formik
          initialValues={{
            genesisID: "",
            kuantitasBenihKg: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.genesisID) {
              errors.varietas = "Varietas tidak boleh kosong";
            } else if (!values.kuantitasBenihKg) {
              errors.kuantitasBenihKg = "Kuantitas tidak boleh kosong";
            }
            return errors;
          }}
          onSubmit={_handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form>
              {_renderStepContent(props.user.memberType)}
              {/* TO-DO : Confirmation Popup */}
              <div className={classes.center}>
                <Button
                  className={classes.confirm}
                  disabled={!(isValid && dirty) || isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Tambah Asset
                </Button>
              </div>
              <DialogConfirmation
                rows={rowsGenesis}
                isVisible={visible}
                modalContent={modalContent}
                handleClose={() => {
                  setVisible(false);
                }}
                dialogTitle="Tambah Asset"
                fcnName="CreateBawang"
                user={props.user}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default Update_Genesis;
