import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { RemoveMenu } from "~/components/RemoveMenu";
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
      {selected.length > 0 && <RemoveMenu size="large" onRemove={onRemove} />}
      {onChangeSearch && onSubmitSearch && (
        <SearchMenu
          size="large"
          onSearch={onChangeSearch}
          onSearchSubmit={onSubmitSearch}
        />
      )}
      {customAdditionalRenderMenu}
    </Toolbar>
  );
};
