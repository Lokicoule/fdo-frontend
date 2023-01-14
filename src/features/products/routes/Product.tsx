import { useParams } from "react-router-dom";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ViewProduct } from "../components/ViewProduct";

export const Product = () => {
  const { productId } = useParams();

  if (!productId) {
    return null;
  }

  return (
    <ContentLayout
      title="Product"
      fallback={{
        title: "Product",
      }}
      locations={[
        {
          name: "Home",
          path: "/app",
        },
        {
          name: "Products",
          path: "/app/products",
        },
        {
          name: "View product",
        },
      ]}
    >
      <ViewProduct productId={productId} />
    </ContentLayout>
  );
};
