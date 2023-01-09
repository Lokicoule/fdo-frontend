import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { object as YupObject, string as YupString } from "yup";
import { Form } from "~/components/Form/Form";
import { FormDialog } from "~/components/Form/FormDialog";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { useCreateProduct } from "../api/createProduct";

type CreateProductValues = {
  code: string;
  label: string;
};

const schema = YupObject().shape({
  code: YupString().trim().max(20),
  label: YupString().trim().min(3).max(20).required(),
});

const defaultValues = {
  code: "",
  label: "",
} satisfies CreateProductValues;

export const CreateProduct: React.FunctionComponent = (props) => {
  const createProductMutation = useCreateProduct();

  const { t } = useTranslation();

  console.info("CreateProductForm render", props);

  const handleSubmit = async (data: CreateProductValues) => {
    await createProductMutation.mutateAsync({
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
          Create product
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
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      submitButton={
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={createProductMutation.isLoading}
          form="create-product-form"
        >
          Sauvegarder
        </Button>
      }
      isDone={createProductMutation.isSuccess}
      onClose={createProductMutation.reset}
    >
      <FormWrapper error={createProductMutation.error}>
        <Form<CreateProductValues, typeof schema>
          onSubmit={handleSubmit}
          schema={schema}
          options={{ defaultValues }}
          id="create-product-form"
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
                  name="label"
                  control={control}
                  label="Libellé produit"
                  required
                  fullWidth
                  autoFocus
                  error={formState.errors["label"]}
                />
              </Grid>
            </Grid>
          )}
        </Form>
      </FormWrapper>
    </FormDialog>
  );
};
