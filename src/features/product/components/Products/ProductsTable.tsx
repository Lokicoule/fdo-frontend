import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Paper, Tooltip } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { useTranslation } from "react-i18next";
import { buildKeyFromErrorMessage } from "~/libs/i18n/i18n.utils";

import { RemoveMenu } from "~/components/RemoveMenu";
import { ColumnData, Table } from "~/components/Table";
import { FetchError } from "~/libs/graphql-fetcher";
import {
  GetProductsQuery,
  ProductDto,
  useGetProductsQuery,
} from "../../graphql/product.client";
import { ProductPath } from "./ProductsDialog";

const mapData = (data: GetProductsQuery | undefined) => {
  return data?.getProducts ?? [];
};

type ProductsTableProps = {
  onOpenDialog: (path: ProductPath, product?: ProductDto) => void;
  onRemoveOne: (id: string) => void;
  onRemoveMany: (ids: string[]) => void;
};

export const ProductsTable: React.FunctionComponent<ProductsTableProps> = (
  props
) => {
  const { onOpenDialog, onRemoveMany, onRemoveOne } = props;
  const { t } = useTranslation(["common", "product"]);

  const { data, error, isError, isLoading } = useGetProductsQuery(
    {},
    {
      onError: (error) => {
        console.log("onerror", error);
      },
      useErrorBoundary: (error) =>
        error instanceof FetchError && error.status >= 500,
    }
  );

  const columns: ColumnData[] = [
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
          onClick={() => onOpenDialog("view", item)}
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
              onClick={() => onOpenDialog("update", item)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <RemoveMenu onRemove={() => onRemoveOne(item.id)} />
        </>
      ),
      sortable: true,
      optional: true,
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        onRemove={onRemoveMany}
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
                onClick={() => onOpenDialog("create")}
              >
                <AddIcon fontSize="medium" />
              </IconButton>
            </Tooltip>,
          ],
        }}
        columns={columns}
        data={mapData(data)}
      />
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
    </>
  );
};
