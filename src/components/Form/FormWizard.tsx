import {
  Box,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  FieldValues,
  FormProvider,
  Path,
  UseFormReset,
  UseFormResetField,
} from "react-hook-form";
import { AnyObjectSchema } from "yup";
import { Form, FormProps } from "./Form";

export type FormWizardProps<
  TFormValues extends FieldValues,
  ValidationSchema extends AnyObjectSchema
> = {
  steps: {
    name: string;
    component: React.FC;
    skip?: boolean;
    reset?: boolean;
    schema: AnyObjectSchema;
    id: FormProps<TFormValues, ValidationSchema>["id"];
    options?: FormProps<TFormValues, ValidationSchema>["options"];
    onSubmit: FormProps<TFormValues, ValidationSchema>["onSubmit"];
  }[];
};

export const FormWizard = <
  TFormValues extends FieldValues = FieldValues,
  ValidationSchema extends AnyObjectSchema = AnyObjectSchema
>({
  steps,
}: FormWizardProps<TFormValues, ValidationSchema>) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [skipped, setSkipped] = useState(new Set<number>());

  const currentStep = steps[activeStep];

  const { name, component: Component, onSubmit, ...formProps } = currentStep;

  const totalSteps = () => {
    return steps.length;
  };

  const isStepOptional = (step: number) => {
    return steps[step].skip;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = async () => {
    if (isLastStep()) {
      setCompleted(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (reset: UseFormReset<TFormValues>) => {
    setActiveStep(0);
    setCompleted(false);
    reset();
  };

  const handleSkip = (resetField: UseFormResetField<TFormValues>) => {
    if (!currentStep.skip) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });

    const fields = Object.keys(currentStep.schema.fields);
    fields?.forEach((field) => {
      resetField(field as Path<TFormValues>);
    });

    handleNext();
  };

  const handleSubmit = (data: TFormValues) => {
    handleNext();
    onSubmit(data);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.name} {...stepProps}>
              <StepLabel {...labelProps}>{step.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Form<TFormValues, typeof currentStep.schema>
        onSubmit={handleSubmit}
        {...formProps}
      >
        {(methods) => (
          <FormProvider {...methods}>
            <Component />
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{ mt: 2 }}
            >
              {completed ? (
                <Box>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                </Box>
              ) : (
                <>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    {currentStep?.reset ? (
                      <Button onClick={() => handleReset(methods.reset)}>
                        Reset
                      </Button>
                    ) : null}
                    {currentStep?.skip ? (
                      <Button onClick={() => handleSkip(methods.resetField)}>
                        Skip
                      </Button>
                    ) : null}
                  </Stack>
                  <Button variant="contained" type="submit">
                    {isLastStep() ? "Finish" : "Next"}
                  </Button>
                </>
              )}
            </Stack>
          </FormProvider>
        )}
      </Form>
    </>
  );
};
