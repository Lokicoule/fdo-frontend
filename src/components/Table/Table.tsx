import {
  Checkbox,
  Stack,
  TableCell,
  TablePagination,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { cloneElement, useEffect, useState } from "react";
import { SearchButton } from "../Search/Search";
import { SkeletonTable } from "./SkeletonTable";
import { TableBase, TableBaseProps } from "./TableBase";

type Order = "asc" | "desc";

type PaginationOptions = {
  rowsPerPage: number;
  rowsPerPageOptions: number[];
};

type SelectionOptions = {
  selectionButton: React.ReactElement;
};

type ToolbarOptions = {
  title?: string;
  addButton?: React.ReactElement;
};

export type TableProps<Entry> = Pick<
  TableBaseProps<Entry>,
  "data" | "columns"
> & {
  sortable?: boolean;
  searchable?: boolean;
  pagination?: PaginationOptions;
  selection?: SelectionOptions;
  toolbar?: ToolbarOptions;
  isLoading?: boolean;
};

type OverrideTableProps<Entry> = TableProps<Entry> & {
  searchField?: JSX.Element;
};

type OverrideTableBaseProps<Entry> = TableBaseProps<Entry> & {
  searchField?: JSX.Element;
};

const witchCheckboxSelection =
  <Entry extends { id: string }>(
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ data, selection, ...props }: OverrideTableProps<Entry>) => {
    if (!selection?.selectionButton) return <Element {...props} data={data} />;

    const { selectionButton } = selection;

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

    const triggerButton = cloneElement(
      selectionButton as React.ReactElement<{ ids?: Entry["id"][] }>,
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
            {triggerButton}
          </Toolbar>
        ) : (
          <Toolbar />
        )}
        <Element
          {...props}
          data={data}
          selected={(id: string) => isSelected(id)}
          renderCheckbox={(id: string) => (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={isSelected(id)}
                onClick={() => handleSelect(id)}
              />
            </TableCell>
          )}
          triggerCheckbox={
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
          }
        />
      </>
    );
  };

const withPagination =
  <Entry extends { id: string }>(
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ data, pagination, ...props }: OverrideTableProps<Entry>) => {
    if (!pagination) return <Element {...props} data={data} />;

    const { rowsPerPageOptions = [5, 10, 25, 50] } = pagination;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(
      pagination.rowsPerPage || rowsPerPageOptions[0]
    );

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const paginatedData = data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return (
      <>
        <Element {...props} data={paginatedData} />
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
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ data, columns, sortable, ...props }: OverrideTableProps<Entry>) => {
    if (!sortable) return <Element {...props} data={data} columns={columns} />;

    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof Entry>(columns[0].field);

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
        columns={columns}
        renderCellHead={(column) =>
          column.options.sortable ? (
            <TableSortLabel
              active={orderBy === column.field}
              direction={orderBy === column.field ? order : "asc"}
              onClick={(event) => handleRequestSort(event, column.field)}
            >
              {column.title}
            </TableSortLabel>
          ) : (
            column.title
          )
        }
      />
    );
  };

const withSearch =
  <Entry extends { id: string }>(
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ data, searchable, ...props }: OverrideTableProps<Entry>) => {
    if (!searchable) return <Element {...props} data={data} />;

    const [filter, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");

    const filteredData = data.filter((entry) => {
      return Object.values(entry).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(debouncedSearch.toLowerCase());
        }
        return false;
      });
    });

    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebouncedSearch(filter);
      }, 1000);

      return () => clearTimeout(timeout);
    }, [filter]);

    return (
      <Element
        {...props}
        data={filteredData}
        searchField={<SearchButton filter={filter} onSearch={setSearch} />}
      />
    );
  };

const withToolbar =
  <Entry extends { id: string }>(
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ searchField, toolbar, ...props }: OverrideTableProps<Entry>) => {
    if (!toolbar) return <Element {...props} />;

    return (
      <>
        <Toolbar
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={10} direction="row">
            {toolbar.title ? (
              <Typography variant="h6" component="div">
                {toolbar.title}
              </Typography>
            ) : null}
            {searchField}
          </Stack>

          {toolbar.addButton}
        </Toolbar>
        <Element {...props} />
      </>
    );
  };

const withLoader =
  <Entry extends { id: string }>(
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ isLoading, ...props }: OverrideTableProps<Entry>) => {
    if (!isLoading) return <Element {...props} />;

    return <SkeletonTable columns={props.columns} />;
  };

export const Table = <Entry extends { id: string }>(
  props: TableProps<Entry>
) => {
  const TableWithLoader = withLoader<Entry>(TableBase);
  const TableWithCheckboxSelection =
    witchCheckboxSelection<Entry>(TableWithLoader);
  const TableWithToolbar = withToolbar<Entry>(TableWithCheckboxSelection);
  const TableWithPagination = withPagination<Entry>(TableWithToolbar);
  const TableWithSearch = withSearch<Entry>(TableWithPagination);
  const TableWithSorting = withSorting<Entry>(TableWithSearch);

  return <TableWithSorting {...props} />;
};
