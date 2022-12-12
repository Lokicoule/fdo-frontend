import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface ProductsTableToolbarProps {
  title: string;
  renderMenus?: JSX.Element[];
}

export const ProductsTableToolbar: React.FunctionComponent<
  ProductsTableToolbarProps
> = (props) => {
  const { title, renderMenus } = props;

  return (
    <Toolbar
      sx={{
        pl: { xs: 1, sm: 1 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography flexGrow={1} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>

      {renderMenus}
    </Toolbar>
  );
};
