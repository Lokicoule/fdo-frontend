import { useMediaQuery } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MuiTableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import { ColumnData } from "~/components/Table";

type TableBodyProps = {
  columns: ColumnData[];
  data: any[];
  emptyRows: number;
  selected: string[];
  onSelect: (name: string) => void;
};

export const TableBody = ({
  columns,
  data,
  emptyRows,
  selected,
  onSelect,
}: TableBodyProps) => {
  const theme = useTheme();
  const displayOptional = useMediaQuery(theme.breakpoints.up("sm"));

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const renderCellContent = (item: any, column: ColumnData, idx: number) => {
    if (column.path) {
      return item[column.path];
    }

    if (column.cellRenderer) {
      return column.cellRenderer(item, idx);
    }

    return item[column.key];
  };

  const createCellKey = (item: any, column: ColumnData) => {
    return `key_cell_${item.id}_${column.path ?? column.key}`;
  };

  return (
    <MuiTableBody>
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
            {columns.map((column, idx) =>
              column.optional && !displayOptional ? null : (
                <TableCell key={createCellKey(row, column)}>
                  {renderCellContent(row, column, idx)}
                </TableCell>
              )
            )}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 70 * (emptyRows - selected.length > 0 ? 1 : 0),
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </MuiTableBody>
  );
};
