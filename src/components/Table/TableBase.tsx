import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableHead,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
  options: {
    mobile?: boolean;
    sortable?: boolean;
  };
};

export type TableBaseProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  checkboxSelection?: boolean;
  renderEmptyRows?: (nbColumns: number) => React.ReactNode;
  renderCellHead?: (column: TableColumn<Entry>) => React.ReactNode;
  renderCheckboxChild?: (id: string) => React.ReactNode;
  renderCheckboxParent?: () => React.ReactNode;
  searchField?: JSX.Element;
};

export const ResponsiveCell = ({
  children,
  options,
  ...props
}: TableCellProps & {
  children: React.ReactNode;
  options: {
    mobile?: boolean;
  };
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (options.mobile === false && isMobile) {
    return null;
  }

  return <TableCell {...props}>{children}</TableCell>;
};

export const TableBase = <Entry extends { id: string }>({
  data,
  columns,
  checkboxSelection,
  renderCellHead = (column) => column.title,
  renderEmptyRows = () => null,
  renderCheckboxChild = () => null,
  renderCheckboxParent = () => null,
}: TableBaseProps<Entry>) => {
  if (data.length === 0 || columns.length === 0) {
    return <p>Empty</p>;
  }

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ pb: 2, maxHeight: "70vh" }}
    >
      <MuiTable stickyHeader size="medium">
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              opacity: 0.9,
              fontSize: "0.9rem",
              fontWeight: "bold",
            },
          }}
        >
          <TableRow>
            {renderCheckboxParent()}
            {columns?.map((column, columnIndex) => (
              <ResponsiveCell
                key={`${column.title}_${columnIndex}`}
                options={column.options}
              >
                {renderCellHead(column)}
              </ResponsiveCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((entry, entryIndex) => (
            <TableRow key={entry?.id || entryIndex}>
              {renderCheckboxChild(entry.id)}
              {columns?.map(({ Cell, field, title, options }, columnIndex) => (
                <ResponsiveCell
                  key={`${title}_${columnIndex}`}
                  options={options}
                >
                  <>{Cell ? <Cell entry={entry} /> : entry[field]}</>
                </ResponsiveCell>
              ))}
            </TableRow>
          ))}
          {renderEmptyRows(columns.length + (checkboxSelection ? 1 : 0))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
