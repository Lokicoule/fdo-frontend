import { Suspense, useCallback, useState } from "react";

import { AlertTitle, Button, Paper, Skeleton } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { buildKeyFromErrorMessage } from "~/libs/i18n/i18n.utils";
import { queryClient } from "~/libs/react-query-client";
import {
  GetProductsQuery,
  ProductDto,
  useRemoveProductMutation,
  useRemoveProductsMutation,
} from "../graphql/product.client";
import { ProductPath, ProductsDialog } from "./Products/ProductsDialog";
import { ProductsTable } from "./Products/ProductsTable";

const mapData = (data: GetProductsQuery | undefined) => {
  return data?.getProducts ?? [];
};

export const ProductsContent = () => {
  const { t } = useTranslation(["common", "product"]);

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [path, setPath] = useState<ProductPath>(undefined);

  const removeProductsMutation = useRemoveProductsMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const removeProductMutation = useRemoveProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleCloseDialog = useCallback(() => {
    setProduct(null);
    setPath(undefined);
    setOpen(false);
  }, []);

  const handleOpenDialog = useCallback(
    (path: ProductPath, product?: ProductDto) => {
      if (product) setProduct(product);
      setPath(path);
      setOpen(true);
    },
    []
  );

  const handleRemoveMany = useCallback((ids: string[]) => {
    removeProductsMutation
      .mutateAsync({
        ids,
      })
      .then(() => {
        handleCloseDialog();
      });
  }, []);

  const handleRemoveOne = useCallback((id: string) => {
    removeProductMutation
      .mutateAsync({
        removeProductId: id,
      })
      .then(() => {
        handleCloseDialog();
      });
  }, []);

  return (
    <>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <Box mt={2}>
                  <Alert severity="error">
                    <AlertTitle>
                      <strong>Error</strong>
                    </AlertTitle>
                    {t(
                      buildKeyFromErrorMessage({
                        ns: ["product"],
                        baseKey: "errors",
                        error: error,
                      })
                    )}
                  </Alert>

                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => resetErrorBoundary()}
                    >
                      Try again
                    </Button>
                  </Box>
                </Box>
              )}
              onReset={reset}
            >
              <ProductsTable
                onOpenDialog={handleOpenDialog}
                onRemoveMany={handleRemoveMany}
                onRemoveOne={handleRemoveOne}
              />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Paper>
      <ProductsDialog
        open={open}
        path={path}
        onClose={handleCloseDialog}
        product={product}
        onOpen={handleOpenDialog}
        onRemove={handleRemoveOne}
      />
    </>
  );
};
