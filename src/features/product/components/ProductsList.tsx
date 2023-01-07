import { Table } from "@mui/material";
import { useGetProductsQuery } from "../api/product.client";
import TableContainer from "@mui/material/TableContainer";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody } from "@mui/material";

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
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell>{column.title}</TableCell>
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
  </TableContainer>;
};

export const ProductsList = () => {
  const getProductsQuery = useGetProductsQuery();
};
