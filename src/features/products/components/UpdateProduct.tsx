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
import { useGetProduct } from "../api/getProduct";
import { useUpdateProduct } from "../api/updateProduct";

type UpdateProductProps = {
  productId: string;
};

type UpdateProductFormProps = UpdateProductProps & {
  onSubmit: (data: UpdateProductValues) => Promise<void>;
  error?: Error | null;
};

type UpdateProductValues = {
  code: string;
  label: string;
};

const schema = YupObject().shape({
  code: YupString().trim().max(20).required(),
  label: YupString().trim().min(3).max(20).required(),
});

const UpdateProductForm: React.FunctionComponent<UpdateProductFormProps> = (
  props
) => {
  const { productId, error, onSubmit } = props;
  const { t } = useTranslation(["common", "products"]);

  const [warnMessage, setWarnMessage] = useState<string | null>(null);

  const getProductQuery = useGetProduct({
    id: productId,
  });

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

  const handleSubmit = async (data: UpdateProductValues) => {
    if (
      data.code === getProductQuery.data?.code &&
      data.label === getProductQuery.data?.label
    ) {
      setWarnMessage(t("products:@updateProduct.warnMessageNoChanges"));
      return;
    }
    setWarnMessage(null);
    await onSubmit(data);
  };

  return (
    <FormWrapper error={error} warn={warnMessage} namespace="products">
      <Form<UpdateProductValues, typeof schema>
        onSubmit={handleSubmit}
        schema={schema}
        options={{
          defaultValues: {
            code: getProductQuery.data?.code,
            label: getProductQuery.data?.label,
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
                label={t("dictionary.label")}
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

export const UpdateProduct: React.FunctionComponent<UpdateProductProps> = (
  props
) => {
  const { productId } = props;

  const updateProductMutation = useUpdateProduct();

  const { t } = useTranslation(["products", "common"]);

  const handleSubmit = async (data: UpdateProductValues) => {
    await updateProductMutation.mutateAsync({
      payload: {
        ...data,
        id: productId,
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
          {t("products:@updateProduct.title")}
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
          disabled={updateProductMutation.isLoading}
          form="update-product-form"
        >
          {t("common:dictionary.save")}
        </Button>
      }
      isDone={updateProductMutation.isSuccess}
      onClose={updateProductMutation.reset}
    >
      <UpdateProductForm
        productId={productId}
        onSubmit={handleSubmit}
        error={updateProductMutation.error}
      />
    </FormDialog>
  );
};
