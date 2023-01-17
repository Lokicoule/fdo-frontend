import { useTranslation } from "react-i18next";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ProductsList } from "../components/ProductsList";

export const Products = () => {
  const { t } = useTranslation();

  const title = t("dictionary.products");

  return (
    <ContentLayout
      locations={[
        {
          name: t("dictionary.dashboard"),
          path: "/app",
        },
        {
          name: title,
          path: "/app/products",
        },
      ]}
      errorFallback={{
        title,
      }}
    >
      <ProductsList />
    </ContentLayout>
  );
};
