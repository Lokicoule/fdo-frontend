import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { ColumnProps } from "..";

enum Direction {
  ASCENDANT = "asc",
  DESCENDANT = "desc",
}

type EnhancedTableProps = {
  numSelected: number;
  onSort: (property: string) => void;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: boolean;
  orderBy: string;
  rowCount: number;
  columns: ColumnProps[];
};

export const EnhancedTableHeader = (props: EnhancedTableProps) => {
  const {
    onSelectAll,
    order,
    orderBy,
    numSelected,
    rowCount,
    onSort,
    columns,
  } = props;

  const handleSort = (property: string) => () => onSort(property);

  const direction: Direction = order
    ? Direction.DESCENDANT
    : Direction.ASCENDANT;

  return (
    <TableHead
      sx={{
        "& .MuiTableCell-root": {
          backgroundColor: "primary.dark",
          color: "inherit",
        },
      }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
            inputProps={{
              "aria-label": "select all items",
            }}
          />
        </TableCell>
        {columns?.map((column: ColumnProps) => (
          <TableCell
            sx={{
              "& .MuiTableSortLabel-root:hover": {
                color: "secondary.main",
              },
            }}
            key={column.key}
            align="left"
            padding={column.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === column.key ? direction : false}
          >
            {column.sortable ? (
              <TableSortLabel
                active={orderBy === column.key}
                direction={
                  orderBy === column.key ? direction : Direction.ASCENDANT
                }
                onClick={handleSort(column.key)}
              >
                <Typography variant="overline" fontWeight={"bold"}>
                  {column.label}
                </Typography>
              </TableSortLabel>
            ) : (
              <Typography variant="overline" fontWeight={"bold"}>
                {column.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
