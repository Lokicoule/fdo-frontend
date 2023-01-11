import {
  Checkbox,
  TableCell,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { cloneElement, useState } from "react";
import { TableBase, TableBaseProps } from "./TableBase";

type Order = "asc" | "desc";

type TableProps<Entry> = TableBaseProps<Entry> & {
  pageSize?: number;
  rowsPerPageOptions?: number[];
  pagination?: boolean;
  sortable?: boolean;
  deleteSelectedButton?: React.ReactElement;
};

const witchCheckboxSelection =
  <Entry extends { id: string }>(
    Element: React.ComponentType<TableBaseProps<Entry>>
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
          checkboxSelection={checkboxSelection}
          renderCheckboxChild={(id: string) => (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isSelected(id)}
                onClick={() => handleSelect(id)}
              />
            </TableCell>
          )}
          renderCheckboxParent={() => (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAll}
              />
            </TableCell>
          )}
        />
      </>
    );
  };

const withPagination =
  <Entry extends { id: string }>(
    Element: React.ComponentType<TableBaseProps<Entry>>
  ): React.FunctionComponent<TableProps<Entry>> =>
  ({
    data,
    pageSize = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    pagination,
    ...props
  }: TableProps<Entry>) => {
    if (!pagination) return <Element {...props} data={data} />;

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
        <Element
          {...props}
          data={paginatedData}
          renderEmptyRows={(nbColumns) =>
            emptyRows > 0 ? (
              <TableRow style={{ height: 63 * emptyRows }}>
                <TableCell colSpan={nbColumns} />
              </TableRow>
            ) : null
          }
        />
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

const withSorting =
  <Entry extends { id: string }>(
    Element: React.ComponentType<TableBaseProps<Entry>>
  ): React.FunctionComponent<TableProps<Entry>> =>
  ({ data, sortable, ...props }: TableProps<Entry>) => {
    if (!sortable) return <Element {...props} data={data} />;

    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Entry>("id");

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Entry
    ) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const sortedData = data.slice().sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    return (
      <Element
        {...props}
        data={sortedData}
        renderCellHead={({ column }) =>
          column.options.sortable ? (
            <TableSortLabel
              active={orderBy === column.field}
              direction={orderBy === column.field ? order : "asc"}
              onClick={(event) => handleRequestSort(event, column.field)}
            >
              {column.title}
            </TableSortLabel>
          ) : (
            <>{column.title}</>
          )
        }
      />
    );
  };

export const Table = <Entry extends { id: string }>(
  props: TableProps<Entry>
) => {
  const TableWithCheckboxSelection = witchCheckboxSelection<Entry>(TableBase);
  const TableWithPagination = withPagination<Entry>(TableWithCheckboxSelection);
  const TableWithSorting = withSorting<Entry>(TableWithPagination);

  return <TableWithSorting {...props} />;
};
