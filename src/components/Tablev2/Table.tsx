import { Checkbox, TablePagination, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { cloneElement, useState } from "react";
import { TableBase, TableBasePassThroughProps } from "./TableBase";

type TableProps<Entry> = TableBasePassThroughProps<Entry> & {
  pageSize?: number;
  rowsPerPageOptions?: number[];
  pagination?: boolean;
  checkboxSelection?: boolean;
  deleteSelectedButton?: React.ReactElement;
  emptyRows?: number;
  CheckboxParent?: () => React.ReactElement;
  CheckboxChild?: ({ id }: { id: string }) => React.ReactElement;
};

export type TablePassThroughProps<Entry> = Omit<
  TableProps<Entry>,
  "emptyRows" | "CheckboxParent" | "CheckboxChild"
>;

const witchCheckboxSelection =
  <Entry extends { id: string }>(
    Element: React.ComponentType<TableProps<Entry>>
  ): React.FunctionComponent<TableProps<Entry>> =>
  ({
    data,
    checkboxSelection,
    deleteSelectedButton,
    ...props
  }: TableProps<Entry>) => {
    if (!checkboxSelection || !deleteSelectedButton)
      return <Element {...props} data={data} />;

    const [selected, setSelected] = useState<Entry["id"][]>([]);

    const handleSelect = (id: Entry["id"]) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: Entry["id"][] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected(data.map((item) => item.id));
      } else {
        setSelected([]);
      }
    };

    const isSelected = (id: Entry["id"]) => selected.includes(id);

    const deleteButton = cloneElement(
      deleteSelectedButton as React.ReactElement<{ ids?: Entry["id"][] }>,
      {
        ids: selected,
      }
    );

    return (
      <>
        {selected.length > 0 ? (
          <Toolbar
            sx={{
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }),
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography color="inherit" variant="subtitle1" component="div">
              {selected.length} selected
            </Typography>
            {deleteButton}
          </Toolbar>
        ) : (
          <Toolbar />
        )}
        <Element
          {...props}
          data={data}
          CheckboxChild={({ id }: { id: string }) => (
            <Checkbox
              color="primary"
              checked={isSelected(id)}
              onClick={() => handleSelect(id)}
            />
          )}
          CheckboxParent={() => (
            <Checkbox
              color="primary"
              indeterminate={
                selected.length > 0 && selected.length < data.length
              }
              checked={data.length > 0 && selected.length === data.length}
              onChange={handleSelectAll}
            />
          )}
        />
      </>
    );
  };

const withPagination =
  <Entry extends { id: string }>(
    Element: React.ComponentType<TableProps<Entry>>
  ): React.FunctionComponent<TableProps<Entry>> =>
  ({
    data,
    pageSize = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    pagination,
    ...props
  }: TableProps<Entry>) => {
    if (!pagination) return <Element {...props} data={data} emptyRows={0} />;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);

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

export const Table = <Entry extends { id: string }>(
  props: TableProps<Entry>
) => {
  const TableWithPagination = withPagination<Entry>(TableBase);
  const TableWithCheckboxSelection =
    witchCheckboxSelection<Entry>(TableWithPagination);

  return <TableWithCheckboxSelection {...props} />;
};
