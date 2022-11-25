import {
  Box,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import React from "react";
import { AddressFormContent } from "./forms/Address/AddressForm";
import { CompanyFormContent } from "./forms/Company/CompanyForm";
import { UserFormContent } from "./forms/User/UserForm";

import Paper from "@mui/material/Paper";
import StepContent from "@mui/material/StepContent";
import { CreateUserProvider, useCreateUser } from "./CreateUserContext";

const CreateUser = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { user, company, address, onReset } = useCreateUser();

  const handleNext = React.useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = React.useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const steps = React.useMemo(
    () => [
      {
        label: "User",
        element: (renderFormButtons: JSX.Element) => (
          <UserFormContent onSubmit={handleNext} render={renderFormButtons} />
        ),
      },
      {
        label: "Company",
        element: (renderFormButtons: JSX.Element) => (
          <CompanyFormContent
            onSubmit={handleNext}
            render={renderFormButtons}
          />
        ),
      },
      {
        label: "Address",
        element: (renderFormButtons: JSX.Element) => (
          <AddressFormContent
            onSubmit={handleNext}
            render={renderFormButtons}
          />
        ),
      },
    ],
    []
  );

  const handleReset = () => {
    console.log(user);
    console.log(company);
    console.log(address);
    onReset();
    setActiveStep(0);
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep] && (
        <Paper sx={{ p: 2, m: 2, width: "100%" }}>
          <Typography>{steps[activeStep].label}</Typography>
          {steps[activeStep].element(
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
                {activeStep === steps.length - 1 ? "Finish" : "Continue"}
              </Button>
            </Box>
          )}
        </Paper>
      )}

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Stack>
  );
};

export const CreateUserContent = () => (
  <CreateUserProvider>
    <CreateUser />
  </CreateUserProvider>
);
