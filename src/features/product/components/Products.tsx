import { AlertTitle, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { useTranslation } from "react-i18next";

import { buildKeyFromErrorMessage } from "~/libs/i18n/i18n.utils";
import { ProductContentDialog } from "./ProductContentDialog";
import {
  ProductFactoryProvider,
  withProductFactory,
} from "./ProductsDialogManager";
import ProductsTable from "./ProductsManager";

const StaticProductsTable = withProductFactory(ProductsTable);

const ProductsContent: React.FunctionComponent = () => {
  console.info("ProductsContent render");

  const { t } = useTranslation();

  return (
    <ProductFactoryProvider>
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
              <StaticProductsTable />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Paper>
      <ProductContentDialog />
    </ProductFactoryProvider>
  );
};

export default ProductsContent;
