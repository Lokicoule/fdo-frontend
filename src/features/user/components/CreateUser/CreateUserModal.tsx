import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { FormProvider, useForm } from "react-hook-form";

import {
  AddressFormContent,
  AddressFormProps,
  AddressFormValidationSchema,
} from "./components/AddressForm";
import {
  CompanyFormContent,
  CompanyFormProps,
  CompanyFormValidationSchema,
} from "./components/CompanyForm";
import { ReviewContent } from "./components/Review";
import {
  UserFormContent,
  UserFormProps,
  UserFormValidationSchema,
} from "./components/UserForm";

import { useYupValidationResolver } from "~/hooks";
import { useAuthStore, useEmail } from "~/features/authentication";

import {
  useCreateUserMutation,
  UserCreateInput,
} from "../../graphql/user.client";

export type CreateUserFormProps = UserFormProps &
  CompanyFormProps &
  AddressFormProps;

function getSteps() {
  return ["User", "Company", "Address", "Review"];
}

const CreateUserFormValidationSchema = UserFormValidationSchema.concat(
  CompanyFormValidationSchema
).concat(AddressFormValidationSchema);

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
      return UserFormValidationSchema;
    case 1:
      return CompanyFormValidationSchema;
    case 2:
      return AddressFormValidationSchema;
    case 3:
      return CreateUserFormValidationSchema;
    default:
      throw new Error("Unknown step");
  }
}

function mapUserDetails(
  userDetails: UserFormProps
): Omit<UserCreateInput, "address" | "company"> {
  return {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    phone: userDetails.phone,
  };
}

function mapCompanyDetails(
  companyDetails: CompanyFormProps
): Pick<UserCreateInput, "company"> {
  return {
    company: {
      name: companyDetails.companyName,
      siretNumber: companyDetails.siretNumber,
      vatNumber: companyDetails.vatNumber,
      rcsNumber: companyDetails.rcsNumber,
      sirenNumber: companyDetails.sirenNumber,
    },
  };
}

function mapAddressDetails(
  addressDetails: AddressFormProps
): Pick<UserCreateInput, "address"> {
  return {
    address: {
      address: addressDetails.address,
      city: addressDetails.city,
      country: addressDetails.country,
      zipCode: addressDetails.zipCode,
      additionalAddress: addressDetails?.additionalAddress,
    },
  };
}

export const CreateUserModal = () => {
  const email = useEmail();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(true);
  const { onReload } = useAuthStore();

  const { mutate, isLoading, isError, error } = useCreateUserMutation({
    onSuccess: async () => {
      await onReload();
      setOpen(false);
    },
  });

  const methods = useForm<CreateUserFormProps>({
    defaultValues: {
      email: email ?? "",
    },
    mode: "onChange",
    resolver: useYupValidationResolver(getValidationSchema(activeStep)),
    shouldUnregister: false,
  });

  const { handleSubmit, reset, trigger } = methods;

  const steps = getSteps();

  const handleNext = async (data: CreateUserFormProps) => {
    const isStepValid = await trigger();
    if (!isStepValid || activeStep === steps.length - 1) {
      mutate({
        createUserInput: {
          ...mapUserDetails(data),
          ...mapCompanyDetails(data),
          ...mapAddressDetails(data),
        },
      });

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
    <Dialog open={open} maxWidth="sm">
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
            {isError && <Alert severity="error">Something went wrong</Alert>}
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
              <Button
                disabled={isLoading}
                variant="contained"
                type="submit"
                sx={{ mt: 1, mr: 1 }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Continue"}
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
