import { TablePagination } from "@mui/material";
import { useState } from "react";
import { Table, TableProps } from "./Table";

export type TableWrapperProps<Entry> = TableProps<Entry> & {
  pageSize?: number;
  rowsPerPageOptions?: number[];
  checkboxSelection?: boolean;
  pagination?: boolean;
};

const withPagination =
  <Entry extends { id: string }>(
    Element: React.ComponentType<TableWrapperProps<Entry>>
  ): React.FunctionComponent<TableWrapperProps<Entry>> =>
  ({
    data,
    pageSize = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    pagination,
    ...props
  }: TableWrapperProps<Entry>) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);

    if (!pagination) return <Element {...props} data={data} emptyRows={0} />;

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  pagination,
}: TableWrapperProps<Entry>) => {
  const TableWithPagination = withPagination<Entry>(Table);

  return (
    <TableWithPagination
      data={data}
      columns={columns}
      pagination={pagination}
      pageSize={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
      checkboxSelection={checkboxSelection}
    />
  );
};
