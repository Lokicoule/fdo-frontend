import { useMemo, useState } from "react";

export const useTablePagination = (
  size: number
): [
  { page: number; rowsPerPage: number; emptyRows: number },
  {
    onChangePage: (event: unknown, newPage: number) => void;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
] => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlers = useMemo(
    () => ({
      onChangePage: handleChangePage,
      onChangeRowsPerPage: handleChangeRowsPerPage,
    }),
    []
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - size) : 0;

  return [{ page, rowsPerPage, emptyRows }, handlers];
};
