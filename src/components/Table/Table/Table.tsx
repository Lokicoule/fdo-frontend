import { Table as MuiTable } from "@mui/material";
import { TableBody, TableBodyProps } from "./TableBody";
import { TableHeader } from "./TableHeader";

type TableProps = TableBodyProps & {
  size?: "small" | "medium" | undefined;
};

export const Table = ({ size = "medium", columns, data }: TableProps) => {
  return (
    <MuiTable size={size}>
      <TableHeader columns={columns}></TableHeader>
      <TableBody data={data} columns={columns}></TableBody>
    </MuiTable>
  );
};
