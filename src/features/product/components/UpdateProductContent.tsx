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
} from "~/features/product/graphql/product.client";
import { queryClient } from "../../../libs/react-query-client";

type FormProps = {
  code?: string;
  label: string;
};

const validationSchema = yup.object().shape({
  code: yup.string().required("Le code du produit est requis."),
  label: yup.string().required("Le nom du produit est requis."),
});

type UpdateProductContentProps = {
  //open: boolean;
  onClose: () => void;
  product: ProductDto;
};

export const UpdateProductContent: React.FunctionComponent<
  UpdateProductContentProps
> = (props) => {
  const { product, onClose } = props;

  const { mutateAsync, isLoading, isError, error } = useUpdateProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
      onClose();
    },
  });

  const methods = useForm<FormProps>({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      code: product.code,
      label: product.label,
    },
  });

  const { control, handleSubmit, formState } = methods;
  const { errors } = formState;
  const { reset } = methods;

  const onSubmit = async (data: FormProps) => {
    const result = await mutateAsync({
      payload: {
        id: product.id,
        ...data,
      },
    });
    if (!isError && Boolean(result)) {
      reset();
    }
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <InventoryIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Mise à jour produit
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
            ></FormInputText>
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
    </>
  );
};
