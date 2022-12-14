import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Link,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Table } from "~/components/Table";
import { ColumnData } from "~/components/Table";
import { queryClient } from "~/libs/react-query-client";
import {
  GetProductsQuery,
  useGetProductsQuery,
  useRemoveProductsMutation,
  ProductDto,
} from "../graphql/product.client";
import { CreateProductContent } from "./CreateProductContent";

const columns: ColumnData[] = [
  {
    label: "Code produit",
    key: "code",
    sortable: true,
    cellRenderer: (item: ProductDto) => <Link href={item.id}>{item.code}</Link>,
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
];

const createData = (data: GetProductsQuery | undefined) => {
  return data?.getProducts ?? [];
};

export const ProductsContent = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetProductsQuery({});
  const removeProductsMutation = useRemoveProductsMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (ids: string[]) => {
    removeProductsMutation.mutateAsync({
      ids,
    });
  };

  if (isLoading) return <Box>Loading...</Box>;
  return (
    <>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <Table
          onRemove={handleRemove}
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
                  onClick={handleClickOpen}
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
      <CreateProductContent open={open} onClose={handleClose} />
    </>
  );
};
