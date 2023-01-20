import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { object as YupObject, string as YupString } from "yup";
import { Form } from "~/components/Form/Form";
import { FormDialog } from "~/components/Form/FormDialog";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useCreateCustomer } from "../api/createCustomer";

type CreateCustomerValues = {
  code: string;
  name: string;
  email: string;
  phone: string;
};

const schema = YupObject().shape({
  code: YupString().trim().max(20),
  name: YupString().trim().min(3).max(120).required(),
  email: YupString().trim().email().max(120),
  phone: YupString()
    .trim()
    .matches(/^(\+33|0)[1-9]\s?(\d{2}\s?){4}$/),
});

const defaultValues = {
  code: "",
  name: "",
  email: "",
  phone: "",
} satisfies CreateCustomerValues;

export const CreateCustomer: React.FunctionComponent = (props) => {
  const createCustomerMutation = useCreateCustomer();

  const { t } = useTranslation(["common", "customers"]);

  const handleSubmit = async (data: CreateCustomerValues) => {
    await createCustomerMutation.mutateAsync({
      payload: data,
    });
  };

  return (
    <FormDialog
      title={
        <>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <InventoryIcon />
          </Avatar>
          <>{t("customers:@createCustomer.title")}</>
        </>
      }
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
          type="submit"
          variant="contained"
          color="primary"
          disabled={createCustomerMutation.isLoading}
          form="create-customer-form"
        >
          {t("dictionary.save")}
        </Button>
      }
      isDone={createCustomerMutation.isSuccess}
      onClose={createCustomerMutation.reset}
    >
      <FormWrapper error={createCustomerMutation.error} namespace="customers">
        <Form<CreateCustomerValues, typeof schema>
          onSubmit={handleSubmit}
          schema={schema}
          options={{ defaultValues }}
          id="create-customer-form"
        >
          {({ control, formState }) => (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Form.InputField
                  name="code"
                  control={control}
                  label={t("dictionary.code")}
                  fullWidth
                  autoFocus
                  error={formState.errors["code"]}
                />
              </Grid>
              <Grid item xs={12}>
                <Form.InputField
                  name="name"
                  control={control}
                  label={t("dictionary.label")}
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
                  name="phone"
                  control={control}
                  label={t("dictionary.phone")}
                  required
                  fullWidth
                  autoFocus
                  error={formState.errors["phone"]}
                />
              </Grid>
            </Grid>
          )}
        </Form>
      </FormWrapper>
    </FormDialog>
  );
};
