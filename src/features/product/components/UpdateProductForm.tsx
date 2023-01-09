import EditIcon from "@mui/icons-material/Edit";
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
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { object as YupObject, string as YupString } from "yup";
import { Form } from "~/components/Form/Form";
import { FormDialog } from "~/components/Form/FormDialog";
import { FormWrapper } from "~/components/Form/FormWrapper";
import { preventRendering } from "~/utils/render";
import {
  ProductUpdateInput,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../api/product.client";

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

const ProductForm: React.FunctionComponent<
  UpdateProductFormProps & {
    onSubmit: (data: ProductUpdateInput) => Promise<void>;
    error?: Error | null;
  }
> = (props) => {
  const { productId, error, onSubmit } = props;
  const getProductQuery = useGetProductQuery({
    getProductId: productId,
  });
  const { t } = useTranslation(["common"]);

  console.info("ProductForm render", getProductQuery);

  // Check if no changes
  const handleSubmit = (data: ProductUpdateInput) => {
    if (
      data.code !== getProductQuery.data?.getProduct?.code ||
      data.label !== getProductQuery.data?.getProduct?.label
    ) {
      onSubmit(data);
    } else {
      console.info("No changes");
    }
  };

  if (getProductQuery.isLoading) {
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

  return (
    <FormWrapper error={error}>
      <Form<ProductUpdateInput, typeof schema>
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
        )}
      </Form>
    </FormWrapper>
  );
};

export const UpdateProductForm: React.FunctionComponent<
  UpdateProductFormProps
> = (props) => {
  const { productId } = props;
  const queryClient = useQueryClient();

  const updateProductMutation = useUpdateProductMutation<Error>({
    onSettled: () => {
      queryClient.invalidateQueries(["GetProducts"]);
    },
  });

  console.info("UpdateProductForm render", props);

  const { t } = useTranslation();

  const handleSubmit = async (data: ProductUpdateInput) => {
    console.info("UpdateProductForm handleSubmit", data);
    await updateProductMutation.mutateAsync({
      payload: {
        ...data,
        id: productId,
      },
    });
    /*  .then(() => {
        updateProductMutation.reset();
      }); */
  };

  return (
    <FormDialog
      title={
        <>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <InventoryIcon />
          </Avatar>
          Update product
        </>
      }
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
      onClose={updateProductMutation.reset}
    >
      {preventRendering(
        !updateProductMutation.isSuccess,
        <ProductForm
          productId={productId}
          onSubmit={handleSubmit}
          error={updateProductMutation.error}
        />
      )}
    </FormDialog>
  );
};
