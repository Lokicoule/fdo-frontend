import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ViewIcon from "@mui/icons-material/SearchOutlined";
import {
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { t } from "i18next";
import { useMemo } from "react";
import { Menu, MenuItem, MenuList } from "~/components/Elements/Menuv2";
import { QueryWrapper } from "~/components/Error/QueryErrorBoundary";
import { Table } from "~/components/Table/Table";
import { TableColumn } from "~/components/Table/TableBase";
import { dateFormat } from "../../../utils/dateFormat";
import { useGetProducts } from "../api/getProducts";
import { Product } from "../types";
import { CreateProduct } from "./CreateProduct";
import { DeleteProduct } from "./DeleteProduct";
import { DeleteProducts } from "./DeleteProducts";
import { UpdateProduct } from "./UpdateProduct";

const MobileActionsButtons = ({ entry }: { entry: Product }) => {
  return (
    <Menu
      triggerButton={
        <Tooltip title={"test"}>
          <IconButton size="medium">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
    >
      {() => (
        <MenuList>
          <MenuItem>
            <Tooltip title="view">
              <IconButton href={`./${entry.id}`} size="small">
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </MenuItem>
          <MenuItem>
            <UpdateProduct productId={entry.id} />
          </MenuItem>
          <MenuItem>
            <DeleteProduct product={entry} />
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

const DesktopActionsButtons = ({ entry }: { entry: Product }) => {
  return (
    <Stack flexDirection={"row"} justifyContent={"flex-end"}>
      <Tooltip title="view">
        <IconButton href={`./${entry.id}`} size="small">
          <ViewIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <UpdateProduct productId={entry.id} />
      <DeleteProduct product={entry} />
    </Stack>
  );
};

const ResponsiveActionsButtons = ({ entry }: { entry: Product }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return isDesktop ? (
    <DesktopActionsButtons entry={entry} />
  ) : (
    <MobileActionsButtons entry={entry} />
  );
};

export const ProductsList = () => {
  const getProductsQuery = useGetProducts({});

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        title: t("dictionary.code"),
        field: "code",
        options: {
          mobile: true,
          sortable: true,
        },
      },
      {
        title: t("dictionary.label"),
        field: "label",
        options: {
          mobile: true,
          sortable: true,
        },
      },
      {
        title: t("dictionary.createdAt"),
        field: "createdAt",
        Cell: ({ entry }) => <span>{dateFormat(entry.createdAt)}</span>,
        options: {
          mobile: false,
          sortable: true,
        },
      },
      {
        title: t("dictionary.updatedAt"),
        field: "updatedAt",
        Cell: ({ entry }) => <span>{dateFormat(entry.updatedAt)}</span>,
        options: {
          mobile: false,
          sortable: true,
        },
      },
      {
        title: "",
        field: "id",
        Cell: ({ entry }) => <ResponsiveActionsButtons entry={entry} />,
        options: {
          mobile: true,
        },
      },
    ],
    []
  );

  return (
    <Table<Product>
      data={getProductsQuery.data ?? []}
      columns={columns}
      sortable
      searchable
      isLoading={getProductsQuery.isLoading}
      pagination={{
        rowsPerPageOptions: [5, 10, 25, 50, 100],
        rowsPerPage: 10,
      }}
      selection={{
        selectionButton: <DeleteProducts />,
      }}
      toolbar={{
        title: t("dictionary.products"),
        addButton: (
          <QueryWrapper>
            <CreateProduct />
          </QueryWrapper>
        ),
      }}
    />
  );
};
