import { TableBody as MuiTableBody, TableCell, TableRow } from "@mui/material";
import { ColumnProps } from "../column.props";
import { DataProps } from "../data.props";

export type TableBodyProps = {
  columns: ColumnProps[];
  data: Partial<DataProps>[];
};

export const TableBody = ({ data, columns }: TableBodyProps) => {
  const createKey = (
    item: Partial<DataProps>,
    column: ColumnProps,
    idx: number
  ) => {
    return (item.id ? item.id : idx) + (column.path || column.key);
  };

  const renderCell = (
    item: Partial<DataProps>,
    column: ColumnProps,
    idx: number
  ) => {
    if (column.content) return column.content(item, idx);
    if (column.path) return item[column.path];
    throw new Error("Content or path should be defined.");
  };

  return (
    <MuiTableBody>
      {data?.map((item, idx) => (
        <TableRow sx={{}} key={item.id ? item.id : idx}>
          {columns?.map((column) => (
            <TableCell align="center" key={createKey(item, column, idx)}>
              {renderCell(item, column, idx)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
};
