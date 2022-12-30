import { useCallback, useMemo } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Paper, Tooltip } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { useTranslation } from "react-i18next";
import { buildKeyFromErrorMessage } from "~/libs/i18n/i18n.utils";

import { FetchError } from "~/libs/graphql-fetcher";
import { notify } from "~/libs/notifications";
import { queryClient } from "~/libs/react-query-client";

import { Table } from "~/components/Table";
import { RemoveMenu } from "~/components/RemoveMenu";

import {
  GetProductsQuery,
  ProductDto,
  useGetProductsQuery,
  useRemoveProductMutation,
  useRemoveProductsMutation,
} from "~/features/product/api/product.client";
import { ActionType, ProductsModalContextType } from "./ProductsDialogManager";

const getProductsDto = (data: GetProductsQuery | undefined) => {
  return data?.getProducts ?? [];
};

const ProductsTable: React.FunctionComponent<ProductsModalContextType> = (
  props
) => {
  const { dispatch } = props;

  console.info("ProductsTable render");

  const { t } = useTranslation(["common", "product"]);

  const { data, error, isError, isLoading } = useGetProductsQuery<
    GetProductsQuery,
    FetchError
  >(
    {},
    {
      onError: (error) => {
        notify.error(t("product:notifications.get-products-error"));
      },
      useErrorBoundary: (error) => error.status >= 500,
    }
  );

  const removeProductsMutation = useRemoveProductsMutation<FetchError>({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
      notify.success(t("product:notifications.products-deleted"));
    },
    onError: (error) => {
      notify.error(t("product:notifications.products-not-deleted"));
    },
  });

  const removeProductMutation = useRemoveProductMutation<FetchError>({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
      notify.success(t("product:notifications.product-deleted"));
    },
    onError: (error) => {
      notify.error(t("product:notifications.product-not-deleted"));
    },
  });

  const handleRemoveMany = useCallback((ids: string[]) => {
    removeProductsMutation.mutate({
      ids,
    });
  }, []);

  const handleRemoveOne = useCallback((id: string) => {
    removeProductMutation.mutate({
      removeProductId: id,
    });
  }, []);

  const handleOpenView = (product: ProductDto) => {
    dispatch({
      type: ActionType.OPEN_VIEW,
      state: {
        product,
        isOpen: true,
      },
    });
  };

  const handleOpenEdit = (product: ProductDto) => {
    dispatch({
      type: ActionType.OPEN_EDIT,
      state: {
        product,
        isOpen: true,
      },
    });
  };

  const handleOpenCreate = () => {
    dispatch({
      type: ActionType.OPEN_CREATE,
      state: {
        isOpen: true,
      },
    });
  };

  const columns = [
    {
      label: t("product:products-page.columns.code"),
      key: "code",
      sortable: true,
      cellRenderer: (item: ProductDto) => (
        <Box
          sx={{
            cursor: "pointer",
            textDecoration: "none",
          }}
          onClick={() => handleOpenView(item)}
        >
          {item.code}
        </Box>
      ),
    },
    {
      label: t("product:products-page.columns.label"),
      path: "label",
      key: "label",
      sortable: true,
    },
    {
      label: t("product:products-page.columns.created-at"),
      path: "createdAt",
      key: "createdAt",
      sortable: true,
      optional: true,
    },
    {
      label: t("product:products-page.columns.updated-at"),
      path: "updatedAt",
      key: "updatedAt",
      sortable: true,
      optional: true,
    },
    {
      label: t("product:products-page.columns.actions"),
      key: "actions",
      cellRenderer: (item: ProductDto) => (
        <>
          <Tooltip title={t("product:products-page.actions.edit")}>
            <IconButton
              sx={{
                backgroundColor: "primary.main",
                ml: 1,
              }}
              size="medium"
              onClick={() => handleOpenEdit(item)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <RemoveMenu onRemove={() => handleRemoveOne(item.id)} />
        </>
      ),
      sortable: true,
      optional: true,
    },
  ];

  const TableMemoized = useMemo(
    () => (
      <Table
        loading={isLoading}
        onRemove={handleRemoveMany}
        toolbar={{
          title: t("product:products-page.title"),
          customAdditionalRenderMenu: [
            <Tooltip
              title={t("product:products-page.actions.create")}
              key="add_product"
            >
              <IconButton
                sx={{
                  backgroundColor: "primary.main",
                  ml: 1,
                }}
                size="large"
                onClick={handleOpenCreate}
              >
                <AddIcon fontSize="medium" />
              </IconButton>
            </Tooltip>,
          ],
        }}
        columns={columns}
        data={getProductsDto(data)}
      />
    ),
    [data, isLoading]
  );

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      {TableMemoized}
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
    </Paper>
  );
};

export default ProductsTable;
