import { Typography } from "@mui/material";
import MuiTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { useCallback, useMemo } from "react";
import { TableBody } from "./components/TableBody";
import { TableBodySkeleton } from "./components/TableBodySkeleton";
import { TableHeader } from "./components/TableHeader";
import { TableToolbar, TableToolbarProps } from "./components/TableToolbar";
import { useTablePagination } from "./hooks/useTablePagination";
import { useTableSearch } from "./hooks/useTableSearch";
import { useTableSelect } from "./hooks/useTableSelect";
import { useTableSort } from "./hooks/useTableSort";

export type ColumnData = {
  key: string;
  label: string;
  sortable?: boolean;
  path?: string;
  optional?: boolean;
  cellRenderer?: (item: any, idx: number) => JSX.Element;
};

type TableProps = {
  columns: ColumnData[];
  data: any[];
  toolbar: TableToolbarProps;
  onRemove: (ids: string[]) => void;
  loading: boolean;
};

const ROWS_PER_PAGE = [10, 25, 50, 100];

const SelectedItems = ({ selected }: { selected: string[] }) => {
  return (
    <>
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
    </>
  );
};

export const Table: React.FunctionComponent<TableProps> = (props) => {
  const { columns, data, toolbar, onRemove, loading } = props;

  console.info("Table render");

  const [sort, { onSort }] = useTableSort();
  const [selected, { onSelect, onDeselectAll, onSelectAll }] = useTableSelect();
  const [
    { page, rowsPerPage, emptyRows },
    { onChangePage, onChangeRowsPerPage },
  ] = useTablePagination(data.length);
  const [searchTerm, searchHandlers] = useTableSearch();

  const handleRemove = useCallback(() => {
    onRemove(selected);
    onDeselectAll();
  }, [onRemove, onDeselectAll, selected]);

  const sortedList = useMemo(
    () =>
      sort.isReverse
        ? data.sort((a, b) => (a[sort.property] > b[sort.property] ? -1 : 1))
        : data.sort((a, b) => (a[sort.property] > b[sort.property] ? 1 : -1)),
    [data, sort.isReverse, sort.property]
  );

  const filteredList = useMemo(
    () =>
      sortedList.filter((item) => {
        return Object.keys(item).some((key) => {
          return item[key]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
      }),
    [sortedList, searchTerm]
  );

  return (
    <>
      {/* <TableToolbar
        selected={selected}
        onRemove={handleRemove}
        onChangeSearch={searchHandlers.onChange}
        onSubmitSearch={searchHandlers.onSubmit}
        {...toolbar}
      /> */}
      <TableContainer>
        <MuiTable size={"medium"}>
          <TableHeader
            numSelected={selected.length}
            order={sort.isReverse}
            orderBy={sort.property}
            onSelectAll={onSelectAll(data)}
            onSort={onSort}
            columns={columns}
            rowCount={data.length}
          />
          {loading ? (
            <TableBodySkeleton columns={columns} />
          ) : (
            <TableBody
              data={filteredList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
              columns={columns}
              emptyRows={emptyRows}
              onSelect={onSelect}
              selected={selected}
            ></TableBody>
          )}
        </MuiTable>
      </TableContainer>
      <SelectedItems selected={selected} />
      <TablePagination
        sx={{
          color: "text.secondary",
        }}
        rowsPerPageOptions={ROWS_PER_PAGE}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </>
  );
};
