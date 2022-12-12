export type ColumnProps = {
  label: string;
  path?: string;
  key: string;
  sortable?: boolean;
  numeric?: boolean;
  disablePadding?: boolean;
  content?: (item: any, idx: number) => void;
};
