import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Link,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Fragment, useState } from "react";
import { ColumnProps, EnhancedTable } from "~/components/Table";
import { DataProps } from "~/components/Table/data.props";
import { SearchMenu } from "~/features/search/components/SearchMenu";
import { queryClient } from "~/libs/react-query-client";
import {
  GetProductsQuery,
  useGetProductsQuery,
  useRemoveProductsMutation,
} from "../graphql/product.client";
import { CreateProductContent } from "./CreateProductContent";
import { ProductsTableToolbar } from "./ProductsTableToolbar";

const columns: ColumnProps[] = [
  {
    label: "Code produit",
    key: "code",
    sortable: true,
    content: (item: DataProps) => <Link href={item.id}>{item.code}</Link>,
  },
  {
    label: "Libellé produit",
    path: "label",
    key: "label",
    sortable: true,
  },
];

const additionnalColumns: ColumnProps[] = [
  {
    label: "Date de création",
    path: "createdAt",
    key: "createdAt",
    sortable: true,
  },
  {
    label: "Date de modification",
    path: "updatedAt",
    key: "updatedAt",
    sortable: true,
  },
];

const getData = (data: GetProductsQuery | undefined): DataProps[] => {
  return data?.getProducts ?? [];
};

export const ProductsContent = () => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [term, setTerm] = useState("");
  const [termSubmitted, setTermSubmitted] = useState("");
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetProductsQuery({});
  const removeProductsMutation = useRemoveProductsMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetProducts"],
      });
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setTermSubmitted(term);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async (ids: string[], onRemove: () => void) => {
    const idsAreRemoved = await removeProductsMutation.mutateAsync({
      ids,
    });
    if (idsAreRemoved) {
      onRemove();
    }
  };

  const filteredData = getData(data).filter(
    (item) =>
      item.label.toLowerCase().includes(termSubmitted.toLowerCase()) ||
      item.code.toLowerCase().includes(termSubmitted.toLowerCase())
  );

  if (isLoading) return <Box>Loading...</Box>;
  return (
    <>
      <Paper elevation={5} sx={{ padding: 5 }}>
        <EnhancedTable
          renderToolbar={(selected, onRemove) => (
            <ProductsTableToolbar
              title="Liste de produits"
              renderMenus={[
                <Fragment key="delete_products">
                  {selected.length > 0 && (
                    <Tooltip title="Delete">
                      <IconButton
                        size="medium"
                        onClick={() => handleRemove(selected, onRemove)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Fragment>,
                <SearchMenu
                  onSearch={handleSearch}
                  onSearchSubmit={handleSearchSubmit}
                  key="search_products"
                />,
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
              ]}
            />
          )}
          columns={smallScreen ? columns : [...columns, ...additionnalColumns]}
          data={filteredData}
        />
      </Paper>
      <CreateProductContent open={open} onClose={handleClose} />
    </>
  );
};
