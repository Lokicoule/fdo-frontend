import { TableCell, TableHead, TableRow } from "@mui/material";
import { FC } from "react";
import { ColumnProps } from "../column.props";

export type TableHeaderProps = {
  columns: ColumnProps[];
};

export const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns?.map((column: ColumnProps) => (
          <TableCell
            sx={{
              fontSize: 16,
              fontWeight: "bold",
            }}
            align="center"
            key={column.path || column.key}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
