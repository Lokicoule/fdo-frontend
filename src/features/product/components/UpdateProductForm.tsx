import { Form } from "~/components/Form/Form";
import { FormDialog } from "~/components/Form/FormDialog";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../api/product.client";
import { object as YupObject, string as YupString } from "yup";
import { FormWrapper } from "~/components/Form/FormWrapper";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

type UpdateProductFormProps = {
  productId: string;
};

type UpdateProductValues = {
  code: string;
  label: string;
};

const schema = YupObject().shape({
  code: YupString().trim().max(20).required(),
  label: YupString().trim().min(3).max(20).required(),
});

export const UpdateProductForm: React.FunctionComponent<
  UpdateProductFormProps
> = (props) => {
  const { productId } = props;
  const getProductQuery = useGetProductQuery({
    getProductId: productId,
  });
  const updateProductMutation = useUpdateProductMutation<Error>();
  const { t } = useTranslation();

  const handleSubmit = async (data: UpdateProductValues) => {
    await updateProductMutation.mutateAsync({
      payload: {
        id: productId,
        label: data.label,
        code: data.code,
      },
    });
  };

  return (
    <FormDialog
      title="Update product"
      triggerButton={
        <Tooltip title={t("dictionary.edit")}>
          <IconButton
            sx={{
              backgroundColor: "primary.main",
              ml: 1,
            }}
            size="medium"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      submitButton={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={updateProductMutation.isLoading}
          form="update-product-form"
        >
          Sauvegarder
        </Button>
      }
      isDone={updateProductMutation.isSuccess}
    >
      <FormWrapper error={updateProductMutation.error}>
        <Form<UpdateProductValues, typeof schema>
          onSubmit={handleSubmit}
          schema={schema}
          options={{
            defaultValues: {
              code: getProductQuery.data?.getProduct?.code,
              label: getProductQuery.data?.getProduct?.label,
            },
          }}
          id="update-product-form"
        >
          {({ control, formState }) => (
            <>
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
            </>
          )}
        </Form>
      </FormWrapper>
    </FormDialog>
  );
};
