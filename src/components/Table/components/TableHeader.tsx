import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColumnData } from "~/components/Table";

enum Direction {
  ASCENDANT = "asc",
  DESCENDANT = "desc",
}

type TableHeaderProps = {
  numSelected: number;
  onSort: (property: string) => void;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: boolean;
  orderBy: string;
  rowCount: number;
  columns: ColumnData[];
};

export const TableHeader = (props: TableHeaderProps) => {
  const {
    onSelectAll,
    order,
    orderBy,
    numSelected,
    rowCount,
    onSort,
    columns,
  } = props;

  console.info("TableHeader render");
  const theme = useTheme();
  const displayOptional = useMediaQuery(theme.breakpoints.up("sm"));

  const handleSort = (property: string) => () => onSort(property);

  const direction: Direction = order
    ? Direction.DESCENDANT
    : Direction.ASCENDANT;

  return (
    <TableHead
      sx={{
        bgcolor: (theme) => theme.palette.primary.dark,
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
        {columns?.map((column: ColumnData) =>
          column.optional && !displayOptional ? null : (
            <TableCell
              sx={{
                "& .MuiTableSortLabel-root:hover": {
                  color: "primary.light",
                },
              }}
              key={column.key}
              align="left"
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
          )
        )}
      </TableRow>
    </TableHead>
  );
};
