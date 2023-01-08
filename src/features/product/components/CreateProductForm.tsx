import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { object as YupObject, string as YupString } from "yup";
import { Form } from "~/components/Form/Form";
import { FormDialog } from "~/components/Form/FormDialog";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { FetchError } from "~/libs/graphql-fetcher";
import { queryClient } from "~/libs/react-query";
import { useCreateProductMutation } from "../api/product.client";

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

export const CreateProductForm: React.FunctionComponent = (props) => {
  const createProductMutation = useCreateProductMutation<FetchError>({
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
  });
  const { t } = useTranslation();

  console.info("CreateProductForm render", props);

  const handleSubmit = async (data: CreateProductValues) => {
    await createProductMutation.mutateAsync({
      payload: {
        label: data.label,
        code: data?.code,
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
          Create product
        </>
      }
      onClose={createProductMutation.reset}
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
    >
      {() => (
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
      )}
    </FormDialog>
  );
};
