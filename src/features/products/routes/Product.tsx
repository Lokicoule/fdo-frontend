import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ViewProduct } from "../components/ViewProduct";

export const Product = () => {
  const { productId } = useParams();
  const { t } = useTranslation(["common", "products"]);

  if (!productId) return null;
  const title = t("dictionary.product");

  return (
    <ContentLayout
      title={title}
      errorFallback={{
        title,
      }}
      locations={[
        {
          name: "Dashboard",
          path: "/app",
        },
        {
          name: t("dictionary.products"),
          path: "/app/products",
        },
        {
          name: title,
        },
      ]}
    >
      <ViewProduct productId={productId} />
    </ContentLayout>
  );
};
