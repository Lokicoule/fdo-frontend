import {
  Box,
  Checkbox,
  CircularProgress,
  TableCell,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { cloneElement, useEffect, useState } from "react";
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
  loading?: boolean;
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
        ) : null}
        <Element
          {...props}
          data={data}
          checkboxSelection
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
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ data, sortable, ...props }: OverrideTableProps<Entry>) => {
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
      }, 500);

      return () => clearTimeout(timeout);
    }, [filter]);

    return (
      <Element
        {...props}
        data={filteredData}
        searchField={
          <TextField
            label="Search"
            value={filter}
            onChange={(event) => setSearch(event.target.value)}
          />
        }
      />
    );
  };

const withToolbar =
  <Entry extends { id: string }>(
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ searchField, toolbar, ...props }: OverrideTableProps<Entry>) => {
    if (!toolbar) return <Element {...props} />;

    const { title, addButton } = toolbar;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
      <>
        <Toolbar
          sx={{
            width: "100%",
            mb: 2,
            ...(isMobile && {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }),
          }}
        >
          {title ? (
            <Typography variant="h4" id="tableTitle" component="div">
              {title}
            </Typography>
          ) : null}

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ...(isMobile && {
                mt: 3,
                width: "100%",
                justifyContent: "space-evenly",
              }),
            }}
          >
            {searchField}
            {addButton}
          </Box>
        </Toolbar>
        <Element {...props} />
      </>
    );
  };

const withLoader =
  <Entry extends { id: string }>(
    Element: React.ComponentType<OverrideTableBaseProps<Entry>>
  ): React.FunctionComponent<OverrideTableProps<Entry>> =>
  ({ loading, ...props }: OverrideTableProps<Entry>) => {
    if (!loading) return <Element {...props} />;
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

export const Table = <Entry extends { id: string }>(
  props: TableProps<Entry>
) => {
  const TableWithLoader = withLoader<Entry>(TableBase);
  const TableWithToolbar = withToolbar<Entry>(TableWithLoader);
  const TableWithCheckboxSelection =
    witchCheckboxSelection<Entry>(TableWithToolbar);
  const TableWithPagination = withPagination<Entry>(TableWithCheckboxSelection);
  const TableWithSearch = withSearch<Entry>(TableWithPagination);
  const TableWithSorting = withSorting<Entry>(TableWithSearch);

  return <TableWithSorting {...props} />;
};
