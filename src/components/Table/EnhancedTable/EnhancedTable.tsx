import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { EnhancedTableBody, EnhancedTableBodyProps } from "./EnhancedTableBody";
import { EnhancedTableHeader } from "./EnhancedTableHeader";
import { usePagination } from "./hooks/usePagination";
import { useTableSelect } from "./hooks/useTableSelect";
import { useTableSort } from "./hooks/useTableSort";

type TableProps = Pick<EnhancedTableBodyProps, "columns" | "data"> & {
  renderToolbar: (selected: any, onRemove: () => void) => JSX.Element;
};

const ROWS_PER_PAGE = [5, 10, 25, 50, 100];

export const EnhancedTable: React.FunctionComponent<TableProps> = (props) => {
  const { columns, data, renderToolbar } = props;

  const { sort, handleSort } = useTableSort();
  const { selected, handleSelect, handleSelectAll, handleDeselectAll } =
    useTableSelect();
  const {
    page,
    rowsPerPage,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(data.length);

  const sortedList = sort.isReverse
    ? data.sort((a, b) => (a[sort.property] > b[sort.property] ? -1 : 1))
    : data.sort((a, b) => (a[sort.property] > b[sort.property] ? 1 : -1));

  return (
    <>
      {renderToolbar(selected, handleDeselectAll)}
      <TableContainer>
        <Table size={"medium"}>
          <EnhancedTableHeader
            numSelected={selected.length}
            order={sort.isReverse}
            orderBy={sort.property}
            onSelectAll={handleSelectAll(data)}
            onSort={handleSort}
            columns={columns}
            rowCount={data.length}
          />
          <EnhancedTableBody
            data={sortedList.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            columns={columns}
            emptyRows={emptyRows}
            onSelect={handleSelect}
            selected={selected}
          ></EnhancedTableBody>
        </Table>
      </TableContainer>
      {selected.length > 0 && (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 16px",
            height: 56,
            color: "text.secondary",
          }}
          variant="subtitle1"
          component="div"
        >
          {selected.length} élément(s) sélectionné(s)
        </Typography>
      )}
      <TablePagination
        sx={{
          color: "text.secondary",
        }}
        rowsPerPageOptions={ROWS_PER_PAGE}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
