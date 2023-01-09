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
type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
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
            {columns.map((column, columnIndex) => (
              <TableCell key={`${column}_${columnIndex}`}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((entry, entryIndex) => (
            <TableRow key={entry?.id || entryIndex}>
              {columns.map(({ Cell, field, title }, columnIndex) => (
                <TableCell key={`${title}_${columnIndex}`}>
                  <>{Cell ? <Cell entry={entry} /> : entry[field]}</>
                </TableCell>
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

  console.info("ProductsList render");
  console.info(getProductsQuery);

  const columns: TableColumn<Product>[] = useMemo(
    () => [
      {
        title: "Code",
        field: "code",
      },
      {
        title: "Label",
        field: "label",
      },
      {
        title: "Created at",
        field: "createdAt",
      },
      {
        title: "Updated at",
        field: "updatedAt",
      },
      {
        title: "",
        field: "id",
        Cell: ({ entry }) => <ResponsiveActionsButtons entry={entry} />,
      },
    ],
    []
  );

  return <MyTable<Product> data={getProductsQuery.data} columns={columns} />;
};
