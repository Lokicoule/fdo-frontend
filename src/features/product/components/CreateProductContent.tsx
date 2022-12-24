import InventoryIcon from "@mui/icons-material/Inventory";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";
import { buildKeyFromErrorMessage } from "~/libs/i18n/i18n.utils";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FormInputText } from "~/components/Form/FormInputText";

import { useYupValidationResolver } from "~/hooks/useYupValidationResolver";

import { queryClient } from "../../../libs/react-query-client";
import { useCreateProductMutation } from "../graphql/product.client";
import { useMemo } from "react";
import { notify } from "~/libs/notifications";

type FormProps = {
  code?: string;
  label: string;
};

type CreateProductContentProps = {
  onClose: () => void;
};

export const CreateProductContent: React.FunctionComponent<
  CreateProductContentProps
> = (props) => {
  const { onClose } = props;

  const { t } = useTranslation(["product"]);

  const { mutateAsync, isLoading, isError, error } = useCreateProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
      onClose();
      notify.success("Product created successfully.");
    },
  });

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        code: yup
          .string()
          .max(
            12,
            t("product:create-product-page.form.code.validation.max") ??
              "The code must be at most 12 characters long."
          ),
        label: yup
          .string()
          .min(
            3,
            t("product:create-product-page.form.label.validation.min") ??
              "The label must be at least 3 characters long."
          )
          .max(
            100,
            t("product:create-product-page.form.label.validation.max") ??
              "The label must be at most 100 characters long."
          )
          .required(
            t("product:create-product-page.form.label.validation.required") ??
              "The label is required."
          ),
      }),
    []
  );

  const methods = useForm<FormProps>({
    resolver: useYupValidationResolver(validationSchema),
  });

  const { control, handleSubmit, formState } = methods;
  const { errors } = formState;
  const { reset } = methods;

  const onSubmit = async (data: FormProps) => {
    const result = mutateAsync({
      payload: data,
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
        {t("product:create-product-page.title")}
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
              label={t("product:create-product-page.form.code.label")}
              placeholder={
                t("product:create-product-page.form.code.placeholder") ?? ""
              }
              fullWidth
              error={!!errors.code}
              fieldError={errors.code?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInputText
              name="label"
              control={control}
              label={t("product:create-product-page.form.label.label")}
              placeholder={
                t("product:create-product-page.form.label.placeholder") ?? ""
              }
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
          {t("product:create-product-page.form.submit")}
        </Button>
        {isError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {t(
              buildKeyFromErrorMessage({
                ns: ["product"],
                baseKey: "errors",
                error: error,
              })
            )}
          </Alert>
        )}
      </Box>
    </>
  );
};
