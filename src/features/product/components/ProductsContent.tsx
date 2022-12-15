import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { RemoveMenu } from "~/components/RemoveMenu";
import { ColumnData, Table } from "~/components/Table";
import { queryClient } from "~/libs/react-query-client";
import {
  GetProductsQuery,
  ProductDto,
  useGetProductsQuery,
  useRemoveProductMutation,
  useRemoveProductsMutation,
} from "../graphql/product.client";
import { CreateProductContent } from "./CreateProductContent";
import { UpdateProductContent } from "./UpdateProductContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";

const createData = (data: GetProductsQuery | undefined) => {
  return data?.getProducts ?? [];
};

export const ProductsContent = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductDto | null>(null);

  const { data, error, isLoading } = useGetProductsQuery({});
  const removeProductsMutation = useRemoveProductsMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
  });
  const removeProductMutation = useRemoveProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
  });

  const handleCloseDialog = () => {
    setOpen(false);
    setProduct(null);
  };

  const handleOpenDialog = (product?: ProductDto) => {
    if (product) setProduct(product);
    setOpen(true);
  };

  const handleRemoveMany = (ids: string[]) => {
    removeProductsMutation.mutate({
      ids,
    });
  };

  const handleRemoveOne = (id: string) => {
    removeProductMutation.mutate({
      removeProductId: id,
    });
  };

  const columns: ColumnData[] = [
    {
      label: "Code produit",
      key: "code",
      sortable: true,
      cellRenderer: (item: ProductDto) => (
        <Box
          sx={{
            cursor: "pointer",
            textDecoration: "none",
          }}
          onClick={() => handleOpenDialog(item)}
        >
          {item.code}
        </Box>
      ),
    },
    {
      label: "Libellé produit",
      path: "label",
      key: "label",
      sortable: true,
    },
    {
      label: "Date de création",
      path: "createdAt",
      key: "createdAt",
      sortable: true,
      optional: true,
    },
    {
      label: "Date de modification",
      path: "updatedAt",
      key: "updatedAt",
      sortable: true,
      optional: true,
    },
    {
      label: "Actions",
      key: "actions",
      cellRenderer: (item: ProductDto) => (
        <>
          <IconButton
            sx={{
              backgroundColor: "primary.main",
              ml: 1,
            }}
            size="medium"
            onClick={() => handleOpenDialog(item)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <RemoveMenu onRemove={() => handleRemoveOne(item.id)} />
        </>
      ),
      sortable: true,
      optional: true,
    },
  ];

  if (isLoading) return <Box>Loading...</Box>;
  return (
    <>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <Table
          onRemove={handleRemoveMany}
          toolbar={{
            title: "Liste des produits",
            customAdditionalRenderMenu: [
              <Tooltip title="Ajouter un produit" key="add_product">
                <IconButton
                  sx={{
                    backgroundColor: "primary.main",
                    ml: 1,
                  }}
                  size="large"
                  onClick={() => handleOpenDialog()}
                >
                  <AddIcon fontSize="medium" />
                </IconButton>
              </Tooltip>,
            ],
          }}
          columns={columns}
          data={createData(data)}
        />
      </Paper>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullScreen={fullScreen}
      >
        <DialogActions>
          <IconButton onClick={handleCloseDialog}>
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
          {product ? (
            <UpdateProductContent
              product={product}
              onClose={handleCloseDialog}
            />
          ) : (
            <CreateProductContent onClose={handleCloseDialog} />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
