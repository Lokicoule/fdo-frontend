import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ViewIcon from "@mui/icons-material/SearchOutlined";
import {
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Menu, MenuItem, MenuList } from "~/components/Elements/Menuv2";
import { QueryWrapper } from "~/components/Error/QueryErrorBoundary";
import { Table } from "~/components/Table/Table";
import { TableColumn } from "~/components/Table/TableBase";
import { dateFormat } from "../../../utils/dateFormat";
import { useGetCustomers } from "../api/getCustomers";
import { Customer } from "../types";
import { CreateCustomer } from "./CreateCustomer";
import { DeleteCustomer } from "./DeleteCustomer";
import { DeleteCustomers } from "./DeleteCustomers";
import { UpdateCustomer } from "./UpdateCustomer";

const MobileActionsButtons = ({ entry }: { entry: Customer }) => {
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
            <UpdateCustomer customerId={entry.id} />
          </MenuItem>
          <MenuItem>
            <DeleteCustomer customer={entry} />
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

const DesktopActionsButtons = ({ entry }: { entry: Customer }) => {
  return (
    <Stack flexDirection={"row"} justifyContent={"flex-end"}>
      <Tooltip title="view">
        <IconButton href={`./${entry.id}`} size="small">
          <ViewIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <UpdateCustomer customerId={entry.id} />
      <DeleteCustomer customer={entry} />
    </Stack>
  );
};

const ResponsiveActionsButtons = ({ entry }: { entry: Customer }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return isDesktop ? (
    <DesktopActionsButtons entry={entry} />
  ) : (
    <MobileActionsButtons entry={entry} />
  );
};

export const CustomersList = () => {
  const { t, i18n } = useTranslation(["common", "customers"]);
  const getCustomersQuery = useGetCustomers({});

  const columns: TableColumn<Customer>[] = useMemo(
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
        field: "name",
        options: {
          mobile: true,
          sortable: true,
        },
      },
      {
        title: t("dictionary.email"),
        field: "email",
        options: {
          mobile: false,
          sortable: true,
        },
      },
      {
        title: t("dictionary.phone"),
        field: "phone",
        options: {
          mobile: false,
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
    [i18n.language]
  );

  return (
    <Table<Customer>
      data={getCustomersQuery.data ?? []}
      columns={columns}
      sortable
      searchable
      isLoading={getCustomersQuery.isLoading}
      pagination={{
        rowsPerPageOptions: [5, 10, 25, 50, 100],
        rowsPerPage: 10,
      }}
      selection={{
        selectionButton: <DeleteCustomers />,
      }}
      toolbar={{
        title: t("dictionary.customers"),
        addButton: (
          <QueryWrapper>
            <CreateCustomer />
          </QueryWrapper>
        ),
      }}
    />
  );
};
