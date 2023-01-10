import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableHead,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
  options: {
    mobile?: boolean;
  };
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  emptyRows?: number;
};

const ResponsiveCell = ({
  children,
  options,
}: {
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

  return <TableCell>{children}</TableCell>;
};

export const Table = <Entry extends { id: string }>({
  data,
  columns,
  emptyRows = 0,
}: TableProps<Entry>) => {
  if (data.length === 0) {
    return <p>Empty</p>;
  }
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ pb: 2, maxHeight: "70vh" }}
    >
      <MuiTable stickyHeader>
        <TableHead
          sx={{
            "& .MuiTableCell-root": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              opacity: 0.9,
            },
          }}
        >
          <TableRow>
            {columns?.map((column, columnIndex) => (
              <ResponsiveCell
                key={`${column.title}_${columnIndex}`}
                options={column.options}
              >
                {column.title}
              </ResponsiveCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((entry, entryIndex) => (
            <TableRow key={entry?.id || entryIndex}>
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
          {emptyRows > 0 && (
            <TableRow style={{ height: 63 * emptyRows }}>
              <TableCell colSpan={columns.length} />
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
