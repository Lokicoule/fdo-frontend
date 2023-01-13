import { Link } from "@mui/material";
import { useParams } from "react-router-dom";
import { Service } from "~/components/Elements/Service";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ViewProduct } from "../components/ViewProduct";

export const Product = () => {
  const { productId } = useParams();

  if (!productId) {
    return null;
  }

  return (
    <ContentLayout
      title="View product"
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
      <Service>
        <ViewProduct productId={productId} />
      </Service>
    </ContentLayout>
  );
};
