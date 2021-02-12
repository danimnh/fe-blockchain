import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Stepper, Step, StepLabel, Button } from "@material-ui/core";

import Meta from "components/Meta";

import { Formik, Form } from "formik";
import { Link as RouterLink } from "react-router-dom";

import useStyles from "./styles";
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
  const isLastStep = activeStep === steps.length - 1;
  //nextStep
  const nextStep = () => {
    setActiveStep(activeStep + 1);
    console.log(formField);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values), null, 2);
    actions.setSubmitting(false);
    history.push("/login");
    nextStep();
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      actions.setSubmitting(false);
      nextStep();
    }
  }

  function _handleBack() {
    prevStep();
  }

  return (
    <>
      <Meta title="Signup Page" description="Signup Page" />
      <Container maxWidth="sm" className={classes.root}>
        <Stepper activeStep={activeStep}>
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
                contact: "",
                dateOfBirth: "",
                noKK: "",
                noNPWP: "",
                noNIK: "",
                memberType: "",
                memberInfo: [],
              }}
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
                        disabled={isSubmitting}
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
