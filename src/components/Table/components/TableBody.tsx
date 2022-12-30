import { useMediaQuery } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MuiTableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import { ColumnData } from "~/components/Table";
import { useMemo } from "react";
import { Rowing } from "@mui/icons-material";

export type TableBodyProps = {
  columns: ColumnData[];
  data: any[];
  emptyRows: number;
  selected: string[];
  onSelect: (name: string) => void;
};

type CellProps = {
  row: any;
  column: ColumnData;
  idx: number;
  displayOptional: boolean;
};

type CellsListProps = {
  row: any;
  columns: ColumnData[];
  displayOptional: boolean;
};

const Cell: React.FunctionComponent<CellProps> = ({
  row,
  column,
  idx,
  displayOptional,
}) => {
  if (column.optional && !displayOptional) {
    return null;
  }

  const renderCellContent = (item: any, column: ColumnData, idx: number) => {
    if (column.path) {
      return item[column.path];
    }
    if (column.cellRenderer) {
      return column.cellRenderer(item, idx);
    }
    return item[column.key];
  };

  return <TableCell>{renderCellContent(row, column, idx)}</TableCell>;
};

const CellsList: React.FunctionComponent<CellsListProps> = ({
  row,
  columns,
  displayOptional,
}) => {
  const createCellKey = (item: any, column: ColumnData) => {
    return `key_cell_${item.id}_${column.path ?? column.key}`;
  };

  return (
    <>
      {columns.map((column, idx) => (
        <Cell
          key={createCellKey(row, column)}
          row={row}
          column={column}
          idx={idx}
          displayOptional={displayOptional}
        />
      ))}
    </>
  );
};

export const TableBody = ({
  columns,
  data,
  emptyRows,
  selected,
  onSelect,
}: TableBodyProps) => {
  console.info("TableBody render");
  const theme = useTheme();
  const displayOptional = useMediaQuery(theme.breakpoints.up("sm"));

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <MuiTableBody>
      {data.map((row) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${row.id}`;

        return (
          <TableRow
            hover
            //onClick={() => onSelect(row.id)}
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
                onClick={() => onSelect(row.id)}
              />
            </TableCell>
            <CellsList
              row={row}
              columns={columns}
              displayOptional={displayOptional}
            />
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
