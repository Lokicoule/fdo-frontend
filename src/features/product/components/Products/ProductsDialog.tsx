import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useTranslation } from "react-i18next";

import { RemoveMenu } from "~/components/RemoveMenu";
import { GetProductsQuery, ProductDto } from "../../graphql/product.client";
import { CreateProductContent } from "../CreateProductContent";
import { ReviewProductContent } from "../ReviewProductContent";
import { UpdateProductContent } from "../UpdateProductContent";

export type ProductPath = "create" | "update" | "view" | undefined;

/* const dialogBuilder = (
  path: ProductPath,
  product: ProductDto | null,
  onClose: () => void
) => {
  if (product) {
    switch (path) {
      case "create":
        return <CreateProductContent onClose={onClose} />;
      case "update":
        return <UpdateProductContent product={product} onClose={onClose} />;
      case "view":
        return <ReviewProductContent product={product} />;
      default:
        return null;
    }
  }

  return null;
};

const dialogActionsBuilder = (
  path: ProductPath,
  onClose: () => void,
  onRemove: () => void
) => {
  switch (path) {
    case "create":
      return (
        <DialogActions>
          <Button onClick={onClose}>{t("common:cancel")}</Button>
          <Button type="submit" form="create-product-form" autoFocus>
            {t("common:save")}
          </Button>
        </DialogActions>
      );
    case "update":
      return (
        <DialogActions>
          <Button onClick={onClose}>{t("common:cancel")}</Button>
          <Button type="submit" form="update-product-form" autoFocus>
            {t("common:save")}
          </Button>
        </DialogActions>
      );
    case "view":
      return (
        <DialogActions>
          <Button onClick={onClose}>{t("common:close")}</Button>
        </DialogActions>
      );
    default:
      return (
        <DialogActions>
          <Button onClick={onClose}>{t("common:cancel")}</Button>
          <Button onClick={onRemove} autoFocus>
            {t("common:remove")}
          </Button>
        </DialogActions>
      );
  }
};
 */

type ProductsDialogProps = {
  open: boolean;
  product: ProductDto | null;
  path: ProductPath;
  onOpen: (path: ProductPath, product?: ProductDto) => void;
  onClose: () => void;
  onRemove: (id: string) => void;
};

export const ProductsDialog: React.FunctionComponent<ProductsDialogProps> = (
  props
) => {
  const { open, path, product, onOpen, onClose, onRemove } = props;
  const { t } = useTranslation(["common", "product"]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const getDialogContent = () => {
    if (product) {
      switch (path) {
        case "update":
          return <UpdateProductContent product={product} onClose={onClose} />;
        case "view":
          return <ReviewProductContent product={product} />;
      }
    }

    if (path === "create") {
      return <CreateProductContent onClose={onClose} />;
    }
    return null;
  };

  const getDialogActions = () => {
    if (path === "view" && product) {
      return (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Button onClick={onClose} color="primary">
              {t("common:cancel")}
            </Button>
          </Box>
          <Tooltip title={t("common:edit")}>
            <IconButton
              sx={{
                backgroundColor: "primary.main",
                ml: 1,
              }}
              size="medium"
              onClick={() => onOpen("update")}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <RemoveMenu onRemove={() => onRemove(product.id)} />
        </>
      );
    }

    if (path === "update" && product) {
      return (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Button onClick={onClose} color="primary">
              {t("common:cancel")}
            </Button>
          </Box>
          <RemoveMenu onRemove={() => onRemove(product.id)} />
        </>
      );
    }

    return (
      <Button onClick={onClose} color="primary">
        {t("common:cancel")}
      </Button>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={fullScreen}>
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogContent
        sx={{
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {getDialogContent()}
      </DialogContent>
      <DialogActions
        sx={{
          p: 2,
          m: 2,
        }}
      >
        {getDialogActions()}
      </DialogActions>
    </Dialog>
  );
};
