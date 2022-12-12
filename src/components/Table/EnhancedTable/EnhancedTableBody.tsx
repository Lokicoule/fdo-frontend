import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ColumnProps } from "../column.props";
import { DataProps } from "../data.props";

export type EnhancedTableBodyProps = {
  columns: ColumnProps[];
  data: DataProps[];
  emptyRows: number;
  selected: readonly string[];
  onSelect: (name: string) => void;
};

export const EnhancedTableBody = ({
  columns,
  data,
  emptyRows,
  selected,
  onSelect,
}: EnhancedTableBodyProps) => {
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const renderCell = (item: DataProps, column: ColumnProps, idx: number) => {
    if (column.content) return column.content(item, idx);
    if (column.path) return item[column.path];
    throw Error("Content or path should be defined.");
  };

  const createKey = (item: DataProps, column: ColumnProps) => {
    return item.id + (column.path || column.key);
  };

  return (
    <TableBody>
      {data.map((row) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${row.id}`;

        return (
          <TableRow
            hover
            onClick={() => onSelect(row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
            </TableCell>
            {columns?.map((column, idx) => (
              <TableCell align="left" key={createKey(row, column)}>
                {renderCell(row, column, idx)}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 70 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};
