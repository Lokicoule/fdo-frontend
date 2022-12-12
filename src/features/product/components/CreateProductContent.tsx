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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInputText } from "~/components/Form/FormInputText";

import { useYupValidationResolver } from "~/hooks/useYupValidationResolver";

import { useCreateProductMutation } from "../graphql/product.client";
import { useTheme } from "@mui/material/styles";
import { queryClient } from "../../../libs/react-query-client";

type FormProps = {
  code?: string;
  label: string;
};

const validationSchema = yup.object().shape({
  code: yup.string(),
  label: yup.string().required("Le nom du produit est requis."),
});

type CreateProductContentProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateProductContent: React.FunctionComponent<
  CreateProductContentProps
> = (props) => {
  const { open, onClose } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { mutate, isLoading, isError, error } = useCreateProductMutation({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
  });

  const methods = useForm<FormProps>({
    resolver: useYupValidationResolver(validationSchema),
  });

  const { control, handleSubmit, formState } = methods;
  const { errors } = formState;

  const onSubmit = async (data: FormProps) => {
    mutate({
      createProductInput: data,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={fullScreen}>
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <InventoryIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Creer un produit
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
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};
