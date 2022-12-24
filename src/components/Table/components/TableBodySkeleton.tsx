import {
  Box,
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { TableBodyProps } from "./TableBody";

type TableBodySkeletonProps = Pick<TableBodyProps, "columns">;

export const TableBodySkeleton: React.FunctionComponent<
  TableBodySkeletonProps
> = (props) => {
  const { columns } = props;

  const theme = useTheme();
  const displayOptional = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <TableBody>
      {[1, 2, 3].map((row, rowIdx) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={rowIdx}>
            <TableCell padding="checkbox">
              <Checkbox color="primary" disabled />
            </TableCell>
            {columns.map((column, idx) =>
              column.optional && !displayOptional ? null : (
                <TableCell key={`${rowIdx}_${idx}`}>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton />
                  </Box>
                </TableCell>
              )
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
