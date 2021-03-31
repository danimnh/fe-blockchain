import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Stepper, Step, StepLabel, Button } from "@material-ui/core";

import Meta from "components/Meta";

import { Formik, Form } from "formik";
import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";
import validationSchema from "./Forms/validationSchema";
import checkoutFormModel from "./Forms/checkoutFormModel";
import FormUserDetail from "./Forms/FormUserDetail";
import FormUserValid from "./Forms/FormUserValid";
import FormUserJob from "./Forms/FormUserJob";
import FormUserTypeDetail from "./Forms/FormUserTypeDetail";

const steps = [
  "Data Pribadi",
  "Data Kenegaraan",
  "Pekerjaan",
  "Informasi Pekerjaan",
];
const { formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <FormUserDetail formField={formField} />;
    case 1:
      return <FormUserValid formField={formField} />;
    case 2:
      return <FormUserJob formField={formField} />;
    case 3:
      return <FormUserTypeDetail formField={formField} />;
    case 4:
      return <h1>success</h1>;
    default:
  }
}

function SignUpPage() {
  const history = useHistory();
  const classes = useStyles();
  // const [ memberType, setMemberType ] = useState('')
  const [activeStep, setActiveStep] = useState(0);
  const [validationController, setValidationController] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  //nextStep
  const nextStep = (values) => {
    setActiveStep(activeStep + 1);
    console.log("active Step : " + activeStep);
    if (values.orgName === "Penangkar" || values.orgName === "Petani") {
      if (validationController === 2) {
        setValidationController(3);
      } else {
        setValidationController(validationController + 1);
      }
    } else if (
      values.orgName === "Pengumpul" ||
      values.orgName === "Pedagang"
    ) {
      if (validationController === 2) {
        setValidationController(4);
      } else {
        setValidationController(validationController + 1);
      }
    } else {
      setValidationController(validationController + 1);
    }

    console.log(values.orgName);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
    if (validationController === 3) {
      setValidationController(2);
    } else if (validationController === 4) {
      setValidationController(2);
    } else {
      setValidationController(validationController - 1);
    }
  };

  const currentValidationSchema = validationSchema[validationController];

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // eslint-disable-next-line
  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values), null, 2);
    actions.setSubmitting(false);
    history.push("/login");
    nextStep();
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      console.log();
      let stringValue = values;
      stringValue.noHP = values.noHP.toString();
      stringValue.luasLahanHa = values.luasLahanHa.toString();
      stringValue.noKK = values.noKK.toString();
      stringValue.noNPWP = values.noNPWP.toString();
      stringValue.nik = values.nik.toString();
      if (values.orgName === "Petani" || values.orgName === "Penangkar") {
        delete stringValue.alamatToko;
      } else if (
        values.orgName === "Pengumpul" ||
        values.orgName === "Pedagang"
      ) {
        delete stringValue.luasLahanHa;
        delete stringValue.alamatLahan;
        delete stringValue.kelompokTani;
      }
      console.log(stringValue);
      // _submitForm(stringValue, actions);
    } else {
      actions.setSubmitting(false);
      nextStep(values);
    }
  }

  function _handleBack() {
    prevStep();
  }

  return (
    <>
      <Meta title="Signup Page" description="Signup Page" />
      <Container maxWidth="sm" className={classes.root}>
        <Stepper className={classes.containerStep} activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel></StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <h1>SignUp Success</h1>
          ) : (
            <Formik
              initialValues={{
                name: "",
                username: "",
                password: "",
                noHP: "",
                ttl: "",
                noKK: "",
                noNPWP: "",
                nik: "",
                orgName: "",
                luasLahanHa: "",
                alamatToko: "",
                alamatLahan: "",
                kelompokTani: "",
              }}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {_renderStepContent(activeStep)}

                  <div className={classes.center}>
                    {activeStep === 0 && (
                      <Button
                        className={classes.button}
                        variant="outlined"
                        component={RouterLink}
                        to="/"
                      >
                        Back
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        className={classes.button}
                        variant="outlined"
                        onClick={_handleBack}
                      >
                        Back
                      </Button>
                    )}
                    <div>
                      <Button
                        className={classes.button}
                        disabled={
                          // !(isValid && dirty) && !validStep
                          isSubmitting
                        }
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        {isLastStep ? "Konfirmasi" : "Next"}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </>
      </Container>
    </>
  );
}

export default SignUpPage;
