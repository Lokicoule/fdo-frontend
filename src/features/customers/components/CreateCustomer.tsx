import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { object as YupObject, string as YupString } from "yup";
import { Form } from "~/components/Form/Form";
import { FormDialog } from "~/components/Form/FormDialog";
import { FormWizard } from "~/components/Form/FormWizard";
import { FormWizardReview } from "~/components/Form/FormWizardReview";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useCreateCustomer } from "../api/createCustomer";

type CreateCustomerValues = {
  code: string;
  name: string;
  email: string;
  phoneNumber: string;
  address?: {
    name: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    country: string;
    zipCode: string;
  };
};

const customerSchema = YupObject().shape({
  code: YupString().trim().max(20),
  name: YupString().trim().min(3).max(120).required(),
  email: YupString().trim().email().max(120),
  phoneNumber: YupString()
    .trim()
    .matches(/^(|(\+33|0)[1-9]\s?(\d{2}\s?){4})$/),
});

const addressSchema = YupObject().shape({
  address: YupObject().shape({
    name: YupString().trim().min(3).max(120).required(),
    phoneNumber: YupString()
      .trim()
      .matches(/^(\+33|0)[1-9]\s?(\d{2}\s?){4}$/),
    addressLine1: YupString().trim().min(3).max(120).required(),
    addressLine2: YupString().trim().max(120),
    city: YupString().trim().min(3).max(120).required(),
    country: YupString().trim().min(3).max(120).required(),
    zipCode: YupString()
      .trim()
      .matches(/^[0-9]{5}$/),
  }),
});

const schema = customerSchema.concat(addressSchema);

const addressDefaultValues = {
  name: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
  zipCode: "",
};

const customerDefaultValues = {
  code: "",
  name: "",
  email: "",
  phoneNumber: "",
};

const defaultValues = {
  ...customerDefaultValues,
  address: addressDefaultValues,
};

/**
 * Address form
 */
const AddressForm = () => {
  const { t } = useTranslation(["common", "customers"]);
  const { control, formState } =
    useFormContext<Pick<CreateCustomerValues, "address">>();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Form.InputField
            name="address.name"
            control={control}
            label={t("dictionary.name")}
            fullWidth
            autoFocus
            error={formState.errors?.address?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="address.phoneNumber"
            control={control}
            label={t("dictionary.phoneNumber")}
            fullWidth
            error={formState.errors?.address?.phoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="address.addressLine1"
            control={control}
            label={t("dictionary.addressLine1")}
            fullWidth
            error={formState.errors?.address?.addressLine1}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="address.addressLine2"
            control={control}
            label={t("dictionary.addressLine2")}
            fullWidth
            error={formState.errors?.address?.addressLine2}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="address.city"
            control={control}
            label={t("dictionary.city")}
            fullWidth
            error={formState.errors?.address?.city}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="address.country"
            control={control}
            label={t("dictionary.country")}
            fullWidth
            error={formState.errors?.address?.country}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="address.zipCode"
            control={control}
            label={t("dictionary.zipCode")}
            fullWidth
            error={formState.errors?.address?.zipCode}
          />
        </Grid>
      </Grid>
    </>
  );
};

/**
 * Customer form
 */
const CustomerForm = () => {
  const { t } = useTranslation(["common", "customers"]);
  const { control, formState } =
    useFormContext<Omit<CreateCustomerValues, "address">>();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Form.InputField
            name="code"
            control={control}
            label={t("dictionary.code")}
            fullWidth
            error={formState.errors.code}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="name"
            control={control}
            label={t("dictionary.name")}
            fullWidth
            autoFocus
            required
            error={formState.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="email"
            control={control}
            label={t("dictionary.email")}
            fullWidth
            error={formState.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <Form.InputField
            name="phoneNumber"
            control={control}
            label={t("dictionary.phone")}
            fullWidth
            error={formState.errors.phoneNumber}
          />
        </Grid>
      </Grid>
    </>
  );
};

// Review create customer data
const Review = () => {
  const { t } = useTranslation(["common", "customers"]);
  const { getValues } = useFormContext<CreateCustomerValues>();

  const values = getValues();
  const filteredValues = {
    ...values,
    address: values.address ? values.address : null,
  };
  const data = [
    { label: t("dictionary.code"), value: filteredValues.code },
    { label: t("dictionary.name"), value: filteredValues.name },
    { label: t("dictionary.email"), value: filteredValues.email },
    { label: t("dictionary.phone"), value: filteredValues.phoneNumber },
    ...(filteredValues.address
      ? [
          {
            label: t("dictionary.address"),
            value: filteredValues.address.name,
          },
          {
            label: t("dictionary.phoneNumber"),
            value: filteredValues.address.phoneNumber,
          },
          {
            label: t("dictionary.addressLine1"),
            value: filteredValues.address.addressLine1,
          },
          {
            label: t("dictionary.addressLine2"),
            value: filteredValues.address.addressLine2 || "",
          },
          { label: t("dictionary.city"), value: filteredValues.address.city },
          {
            label: t("dictionary.country"),
            value: filteredValues.address.country,
          },
          {
            label: t("dictionary.zipCode"),
            value: filteredValues.address.zipCode,
          },
        ]
      : []),
  ];

  return <FormWizardReview title="Review" values={data} />;
};

export const CreateCustomer = () => {
  const { t } = useTranslation(["common", "customers"]);
  const createCustomer = useCreateCustomer();

  const onSubmit = async (values: CreateCustomerValues) => {
    await createCustomer.mutateAsync({
      payload: {
        name: values.name,
        ...(values.code && { code: values.code }),
        ...(values.email && { email: values.email }),
        ...(values.phoneNumber && { phoneNumber: values.phoneNumber }),
        ...(values.address &&
          values.address.name.length > 0 && {
            address: {
              name: values.address.name,
              phoneNumber: values.address.phoneNumber,
              addressLine1: values.address.addressLine1,
              ...(values.address.addressLine2 && {
                addressLine2: values.address.addressLine2,
              }),
              city: values.address.city,
              country: values.address.country,
              zipCode: values.address.zipCode,
            },
          }),
      },
    });
  };

  return (
    <FormDialog
      title={"Create customer"}
      isDone={createCustomer.isSuccess}
      triggerButton={
        <Tooltip title={t("dictionary.add")}>
          <IconButton
            sx={{
              backgroundColor: "primary.main",
              ml: 1,
            }}
            size="medium"
          >
            <AddIcon
              sx={{
                color: "white",
              }}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      }
      submitButton={
        <Button
          variant="contained"
          color="primary"
          form="form-wizard"
          type="submit"
        >
          {t("common:dictionary.save")}
        </Button>
      }
    >
      <FormWrapper error={createCustomer.error}>
        <FormWizard<CreateCustomerValues, typeof schema>
          steps={[
            {
              id: "form-wizard",
              name: "Customer",
              component: CustomerForm,
              schema: customerSchema,
              options: {
                defaultValues,
              },
              onSubmit: () => {},
            },
            {
              id: "form-wizard",
              name: "Address",
              component: AddressForm,
              schema: addressSchema,
              options: {
                defaultValues,
              },
              onSubmit: () => {},
              skip: true,
            },
            {
              id: "form-wizard",
              name: "Review",
              component: Review,
              schema: customerSchema,
              onSubmit,
              reset: true,
            },
          ]}
        />
      </FormWrapper>
    </FormDialog>
  );
};
