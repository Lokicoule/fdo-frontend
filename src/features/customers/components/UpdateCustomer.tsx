import EditIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Avatar,
  Button,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { object as YupObject, string as YupString } from "yup";
import { Form } from "~/components/Form/Form";
import { FormDialog } from "~/components/Form/FormDialog";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useGetCustomer } from "../api/getCustomer";
import { useUpdateCustomer } from "../api/updateCustomer";

type UpdateCustomerProps = {
  customerId: string;
};

type UpdateCustomerFormProps = UpdateCustomerProps & {
  onSubmit: (data: UpdateCustomerValues) => Promise<void>;
  error?: Error | null;
};

type UpdateCustomerValues = {
  code: string;
  name: string;
  email: string;
  phoneNumber: string;
};

const schema = YupObject().shape({
  code: YupString().trim().max(20).required(),
  name: YupString().trim().min(3).max(120).required(),
  email: YupString().trim().email().max(120),
  phoneNumber: YupString()
    .trim()
    .matches(/^(\+33|0)[1-9]\s?(\d{2}\s?){4}$/),
});

const UpdateCustomerForm: React.FunctionComponent<UpdateCustomerFormProps> = (
  props
) => {
  const { customerId, error, onSubmit } = props;
  const { t } = useTranslation(["common", "customers"]);

  const [warnMessage, setWarnMessage] = useState<string | null>(null);

  const getCustomerQuery = useGetCustomer({
    id: customerId,
  });

  if (getCustomerQuery.isLoading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">
            <Skeleton />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1">
            <Skeleton />
          </Typography>
        </Grid>
      </Grid>
    );
  }

  const handleSubmit = async (data: UpdateCustomerValues) => {
    if (
      data.code === getCustomerQuery.data?.code &&
      data.name === getCustomerQuery.data?.name
    ) {
      setWarnMessage(t("customers:@updateCustomer.warnMessageNoChanges"));
      return;
    }
    setWarnMessage(null);
    await onSubmit(data);
  };

  return (
    <FormWrapper error={error} warn={warnMessage} namespace="customers">
      <Form<UpdateCustomerValues, typeof schema>
        onSubmit={handleSubmit}
        schema={schema}
        options={{
          defaultValues: {
            code: getCustomerQuery.data?.code,
            name: getCustomerQuery.data?.name,
            email: getCustomerQuery.data?.email,
            phoneNumber: getCustomerQuery.data?.phoneNumber,
          },
        }}
        id="update-customer-form"
      >
        {({ control, formState }) => (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Form.InputField
                name="code"
                control={control}
                label={t("dictionary.code")}
                required
                fullWidth
                autoFocus
                error={formState.errors["code"]}
              />
            </Grid>
            <Grid item xs={12}>
              <Form.InputField
                name="name"
                control={control}
                label={t("dictionary.name")}
                required
                fullWidth
                autoFocus
                error={formState.errors["name"]}
              />
            </Grid>
            <Grid item xs={12}>
              <Form.InputField
                name="email"
                control={control}
                label={t("dictionary.email")}
                required
                fullWidth
                autoFocus
                error={formState.errors["email"]}
              />
            </Grid>
            <Grid item xs={12}>
              <Form.InputField
                name="phoneNumber"
                control={control}
                label={t("dictionary.phone")}
                required
                fullWidth
                autoFocus
                error={formState.errors["phoneNumber"]}
              />
            </Grid>
          </Grid>
        )}
      </Form>
    </FormWrapper>
  );
};

export const UpdateCustomer: React.FunctionComponent<UpdateCustomerProps> = (
  props
) => {
  const { customerId } = props;

  const updateCustomerMutation = useUpdateCustomer();

  const { t } = useTranslation(["customers", "common"]);

  const handleSubmit = async (data: UpdateCustomerValues) => {
    await updateCustomerMutation.mutateAsync({
      payload: {
        ...data,
        id: customerId,
      },
    });
  };

  return (
    <FormDialog
      title={
        <>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <InventoryIcon />
          </Avatar>
          {t("customers:@updateCustomer.title")}
        </>
      }
      triggerButton={
        <Tooltip title={t("common:dictionary.edit")}>
          <IconButton size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      submitButton={
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={updateCustomerMutation.isLoading}
          form="update-customer-form"
        >
          {t("common:dictionary.save")}
        </Button>
      }
      isDone={updateCustomerMutation.isSuccess}
      onClose={updateCustomerMutation.reset}
    >
      <UpdateCustomerForm
        customerId={customerId}
        onSubmit={handleSubmit}
        error={updateCustomerMutation.error}
      />
    </FormDialog>
  );
};
