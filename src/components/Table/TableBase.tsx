import {
  Paper,
  Skeleton,
  Table as MuiTable,
  TableBody,
  TableHead,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { cloneElement } from "react";

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
  renderEmptyRows?: (nbColumns: number) => React.ReactNode;
  renderCellHead?: (column: TableColumn<Entry>) => React.ReactNode;
  renderCheckbox?: (id: string) => React.ReactNode;
  selected?: (id: string) => boolean;
  triggerCheckbox?: React.ReactElement;
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
  renderCellHead = (column) => column.title,
  renderCheckbox = () => null,
  selected = () => false,
  triggerCheckbox,
}: TableBaseProps<Entry>) => {
  if (data.length === 0 || columns.length === 0) {
    return <p>Empty</p>;
  }

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ mb: 2, maxHeight: "70vh" }}
    >
      <MuiTable stickyHeader size="medium">
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              fontSize: "0.9rem",
              fontWeight: "bold",
            },
          }}
        >
          <TableRow>
            {triggerCheckbox && cloneElement(triggerCheckbox)}
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
            <TableRow
              key={entry?.id || entryIndex}
              selected={selected(entry?.id)}
            >
              {renderCheckbox(entry.id)}
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
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
