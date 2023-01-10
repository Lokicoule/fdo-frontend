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
  CheckboxParent?: () => React.ReactElement;
  CheckboxChild?: ({ id }: { id: string }) => React.ReactElement;
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
  CheckboxParent,
  CheckboxChild,
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
      <MuiTable stickyHeader size="small">
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
            {CheckboxParent && CheckboxChild ? (
              <TableCell>
                <CheckboxParent />
              </TableCell>
            ) : null}
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
              {CheckboxParent && CheckboxChild ? (
                <TableCell>
                  <CheckboxChild id={entry.id} />
                </TableCell>
              ) : null}
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
            <TableRow style={{ height: 43 * emptyRows }}>
              <TableCell
                colSpan={
                  CheckboxChild && CheckboxParent
                    ? columns.length + 1
                    : columns.length
                }
              />
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
