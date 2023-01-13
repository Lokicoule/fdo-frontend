import { Stack, Typography } from "@mui/material";
import { Service } from "~/components/Elements/Service";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ProductsList } from "../components/ProductsList";
import { CreateProduct } from "../components/CreateProduct";

export const Products = () => {
  console.info("Products render");

  return (
    <ContentLayout
      locations={[
        {
          name: "Home",
          path: "/app",
        },
        {
          name: "Products",
          path: "/app/products",
        },
      ]}
    >
      <Service>
        <ProductsList />
      </Service>
    </ContentLayout>
  );
};
