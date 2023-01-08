import { Table } from "@mui/material";
import { GetProductsQuery, useGetProductsQuery } from "../api/product.client";
import TableContainer from "@mui/material/TableContainer";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody } from "@mui/material";
import { Product } from "../types";
import { FetchError } from "~/libs/graphql-fetcher";
import { UpdateProductForm } from "./UpdateProductForm";
import { memo, useMemo } from "react";

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

export const ProductsList = () => {
  const getProductsQuery = useGetProductsQuery<GetProductsQuery, FetchError>(
    {},
    {
      useErrorBoundary: (error) => error.status >= 500,
    }
  );

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
        title: "Actions",
        field: "id",
        Cell: ({ entry }) => <UpdateProductForm productId={entry.id} />,
      },
    ],
    []
  );

  return (
    <MyTable<Product>
      data={getProductsQuery.data?.getProducts ?? []}
      columns={columns}
    />
  );
};
