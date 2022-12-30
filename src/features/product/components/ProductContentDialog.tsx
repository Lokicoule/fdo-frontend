import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CreateProductForm from "./AddProductForm";
import {
  ActionType,
  ContentType,
  initialState,
  useProductFactory,
} from "./ProductsDialogManager";
import ViewProductForm from "./ProductView";
import UpdateProductForm from "./EditProductForm";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import InventoryIcon from "@mui/icons-material/Inventory";

export const ProductContentDialog = () => {
  const { state, dispatch } = useProductFactory();
  const { product, content } = state;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  console.info("ProductsContentDialog render");

  const handleClose = () => {
    dispatch({ type: ActionType.CLOSE, state: initialState });
  };

  return (
    <Dialog open={state.isOpen} onClose={handleClose} fullScreen={fullScreen}>
      <DialogActions>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <InventoryIcon />
        </Avatar>
        <Typography component="div" variant="h5">
          {content === ContentType.CREATE && "Create Product"}
          {content === ContentType.EDIT && "Edit Product"}
          {content === ContentType.VIEW && "View Product"}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {content === ContentType.CREATE && (
          <CreateProductForm onSubmit={handleClose} />
        )}
        {content === ContentType.EDIT && product && (
          <UpdateProductForm product={product} onSubmit={handleClose} />
        )}
        {content === ContentType.VIEW && product && (
          <ViewProductForm product={product} />
        )}
      </DialogContent>
    </Dialog>
  );
};
