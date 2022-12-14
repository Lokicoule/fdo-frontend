import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { SearchMenu } from "~/components/SearchMenu";

export type TableToolbarProps = {
  title: string;
  customAdditionalRenderMenu?: JSX.Element[];
};

type InnerTableToolbarProps = TableToolbarProps & {
  selected: string[];
  onRemove: () => void;
  onChangeSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitSearch?: () => void;
};

export const TableToolbar: React.FunctionComponent<InnerTableToolbarProps> = (
  props
) => {
  const {
    title,
    selected,
    onRemove,
    onChangeSearch,
    onSubmitSearch,
    customAdditionalRenderMenu,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        flexGrow={1}
        variant="overline"
        fontWeight="bold"
        fontSize="1.5rem"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>

      {selected.length > 0 && (
        <Tooltip title="Delete">
          <IconButton size="medium" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {onChangeSearch && onSubmitSearch && (
        <SearchMenu onSearch={onChangeSearch} onSearchSubmit={onSubmitSearch} />
      )}
      {customAdditionalRenderMenu}
    </Toolbar>
  );
};
