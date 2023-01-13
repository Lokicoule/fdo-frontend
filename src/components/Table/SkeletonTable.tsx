import { Paper, Skeleton, Table, TableBody, TableHead } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { ResponsiveCell, TableColumn } from "./TableBase";

type SkeletonTableProps<Entry> = {
  columns: TableColumn<Entry>[];
};

export const SkeletonTable = <Entry extends { id: string }>(
  props: SkeletonTableProps<Entry>
) => {
  const { columns } = props;

  return (
    <TableContainer component={Paper} elevation={3} sx={{ mb: 2 }}>
      <Table stickyHeader size="medium">
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              fontSize: "0.9rem",
              fontWeight: "bold",
            },
          }}
        >
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
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Skeleton variant="rectangular" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Skeleton variant="rectangular" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Skeleton variant="rectangular" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
