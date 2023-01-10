import { TablePagination } from "@mui/material";
import { useState } from "react";
import { Table, TableProps } from "./Table";

export type TableWrapperProps<Entry> = TableProps<Entry> & {
  pageSize?: number;
  rowsPerPageOptions?: number[];
  checkboxSelection?: boolean;
};

// generic HOC to add pagination to a table and pass TableWrapperProps to Table
const withPagination =
  <Entry extends { id: string }>(
    Element: React.ComponentType<TableWrapperProps<Entry>>
  ): React.FunctionComponent<TableWrapperProps<Entry>> =>
  ({
    data,
    pageSize = 5,
    rowsPerPageOptions = [5, 10, 25, 50],
    ...props
  }: TableWrapperProps<Entry>) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const paginatedData = data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    console.log(emptyRows);

    return (
      <>
        <Element {...props} data={paginatedData} emptyRows={emptyRows} />
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
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

export const TableWrapper = <Entry extends { id: string }>({
  pageSize,
  rowsPerPageOptions,
  checkboxSelection,
  data,
  columns,
}: TableWrapperProps<Entry>) => {
  const TableWithPagination = withPagination<Entry>(Table);

  return (
    <TableWithPagination
      data={data}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
      checkboxSelection={checkboxSelection}
    />
  );
};
