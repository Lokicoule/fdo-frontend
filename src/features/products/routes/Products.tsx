import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ProductsList } from "../components/ProductsList";

export const Products = () => {
  console.info("Products render");

  return (
    <ContentLayout
      locations={[
        {
          name: "Dashboard",
          path: "/app",
        },
        {
          name: "Products",
          path: "/app/products",
        },
      ]}
      errorFallback={{
        title: "Products",
      }}
    >
      <ProductsList />
    </ContentLayout>
  );
};
