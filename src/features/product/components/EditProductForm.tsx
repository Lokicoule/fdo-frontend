import CloseIcon from "@mui/icons-material/Close";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInputText } from "~/components/Form/FormInputText";

import { useYupValidationResolver } from "~/hooks/useYupValidationResolver";

import { useTheme } from "@mui/material/styles";
import {
  ProductDto,
  useUpdateProductMutation,
} from "~/features/product/api/product.client";
import { queryClient } from "../../../libs/react-query";
import { FetchError } from "~/libs/graphql-fetcher";
import { notify } from "~/libs/notifications";
import { useTranslation } from "react-i18next";

type FormProps = {
  code?: string;
  label: string;
};

const validationSchema = yup.object().shape({
  code: yup.string().required("Le code du produit est requis."),
  label: yup.string().required("Le nom du produit est requis."),
});

type EditProductFormProps = {
  onSubmit: () => void;
  product: ProductDto;
};

const EditProductForm: React.FunctionComponent<EditProductFormProps> = (
  props
) => {
  const { product, onSubmit } = props;
  const { t } = useTranslation(["product"]);

  const { mutateAsync, isLoading, isError, error } =
    useUpdateProductMutation<FetchError>({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["GetProducts"],
        });
        notify.success(t("product:notifications.product-updated"));
      },
      onError: (error) => {
        notify.error(t("product:notifications.product-not-updated"));
      },
    });

  const methods = useForm<FormProps>({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      code: product.code,
      label: product.label,
    },
  });

  const { control, formState } = methods;
  const { errors } = formState;
  const { reset } = methods;

  const handleSubmit = async (data: FormProps) => {
    mutateAsync({
      payload: {
        id: product.id,
        ...data,
      },
    }).then(() => {
      reset();
      onSubmit();
    });
  };

  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(handleSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormInputText
            name="code"
            control={control}
            label="Code"
            fullWidth
            error={!!errors.code}
            fieldError={errors.code?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="label"
            control={control}
            label="Libellé produit"
            required
            fullWidth
            error={!!errors.label}
            fieldError={errors.label?.message}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        Sauvegarder
      </Button>
      {isError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {JSON.stringify(error)}
        </Alert>
      )}
    </Box>
  );
};

export type { EditProductFormProps };
export default EditProductForm;
