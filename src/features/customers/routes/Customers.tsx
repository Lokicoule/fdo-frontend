import { useTranslation } from "react-i18next";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { CustomersList } from "../components/CustomersList";

export const Customers = () => {
  const { t } = useTranslation();

  const title = t("dictionary.customers");

  return (
    <ContentLayout
      locations={[
        {
          name: t("dictionary.dashboard"),
          path: "/app",
        },
        {
          name: title,
          path: "/app/customers",
        },
      ]}
      errorFallback={{
        title,
      }}
    >
      <CustomersList />
    </ContentLayout>
  );
};
