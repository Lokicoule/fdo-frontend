import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import React from "react";
import {
  AddressFormContent,
  AddressFormProps,
  addressValidationSchema,
} from "./AddressForm";
import {
  CompanyFormContent,
  CompanyFormProps,
  companyValidationSchema,
} from "./CompanyForm";
import {
  UserFormContent,
  UserFormProps,
  userValidationSchema,
} from "./UserForm";

import Paper from "@mui/material/Paper";

import { ReviewContent } from "./Review";
import { FormProvider, useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../../../hooks";
import { useEmail } from "../../../authentication/stores/authStore";

export type FormContentProps = AddressFormProps &
  CompanyFormProps &
  UserFormProps;

function getSteps() {
  return ["User", "Company", "Address", "Review"];
}

const createUserValidationSchema = userValidationSchema
  .concat(companyValidationSchema)
  .concat(addressValidationSchema);

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <UserFormContent />;
    case 1:
      return <CompanyFormContent />;
    case 2:
      return <AddressFormContent />;
    case 3:
      return <ReviewContent />;
    default:
      throw new Error("Unknown step");
  }
}

function getValidationSchema(step: number) {
  switch (step) {
    case 0:
      return userValidationSchema;
    case 1:
      return companyValidationSchema;
    case 2:
      return addressValidationSchema;
    case 3:
      return createUserValidationSchema;
    default:
      throw new Error("Unknown step");
  }
}

export const CreateUserContent = () => {
  const email = useEmail();
  const [activeStep, setActiveStep] = React.useState(0);
  const validationSchema = getValidationSchema(activeStep);

  const methods = useForm<FormContentProps>({
    defaultValues: {
      email: email ?? "",
    },
    mode: "onChange",
    resolver: useYupValidationResolver(validationSchema),
    shouldUnregister: false,
  });

  const { handleSubmit, reset, trigger } = methods;

  const steps = getSteps();

  const handleNext = async (data: FormContentProps) => {
    const isStepValid = await trigger();
    if (!isStepValid || activeStep === steps.length - 1) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    reset();
  };

  return (
    <Dialog open={true}>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ p: 2, m: 2, width: "100%" }}>
          {steps.map((step: string) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleNext)}
            noValidate
            sx={{ mt: 3 }}
          >
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 && (
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              )}
              <Box sx={{ flex: "1 1 auto" }} />
              <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
                {activeStep === steps.length - 1 ? "Finish" : "Continue"}
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
