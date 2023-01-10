import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableHead,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useMemo } from "react";
import { ConfirmationDialog } from "~/components/Elements/ConfirmationDialog";
import { useGetProducts } from "../api/getProducts";
import { Product } from "../types";
import { UpdateProduct } from "./UpdateProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { DeleteProduct } from "./DeleteProduct";
import { Menu, MenuItem, MenuList } from "~/components/Elements/Menuv2";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { preventRenderingIf } from "~/utils/render";
import dateFormat from "../../../utils/dateFormat";
type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
  options: {
    mobile?: boolean;
  };
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
};

const ResponsiveCell = ({
  children,
  options,
}: {
  children: React.ReactNode;
  options: {
    mobile?: boolean;
  };
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (options.mobile === false && isMobile) {
    return null;
  }

  return <TableCell>{children}</TableCell>;
};

const MyTable = <Entry extends { id: string }>({
  data,
  columns,
}: TableProps<Entry>) => {
  if (data.length === 0) {
    return <p>Empty</p>;
  }
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map((column, columnIndex) => (
              <ResponsiveCell
                key={`${column.title}_${columnIndex}`}
                options={column.options}
              >
                {column.title}
              </ResponsiveCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((entry, entryIndex) => (
            <TableRow key={entry?.id || entryIndex}>
              {columns?.map(({ Cell, field, title, options }, columnIndex) => (
                <ResponsiveCell
                  key={`${title}_${columnIndex}`}
                  options={options}
                >
                  <>{Cell ? <Cell entry={entry} /> : entry[field]}</>
                </ResponsiveCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
    <>
      <UpdateProduct productId={entry.id} />
      <DeleteProduct product={entry} />
    </>
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
  const { i18n } = useTranslation();

  console.info("ProductsList render");
  console.info(getProductsQuery);

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        title: "Code",
        field: "code",
        options: {
          mobile: true,
        },
      },
      {
        title: "Label",
        field: "label",
        options: {
          mobile: true,
        },
      },
      {
        title: "Created at",
        field: "createdAt",
        Cell: ({ entry }) => <span>{dateFormat(entry.createdAt)}</span>,
        options: {
          mobile: false,
        },
      },
      {
        title: "Updated at",
        field: "updatedAt",
        Cell: ({ entry }) => <span>{dateFormat(entry.updatedAt)}</span>,
        options: {
          mobile: false,
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

  return <MyTable<Product> data={getProductsQuery.data} columns={columns} />;
};
