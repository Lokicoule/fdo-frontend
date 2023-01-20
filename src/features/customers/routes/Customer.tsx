import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ViewCustomer } from "../components/ViewCustomer";

export const Customer = () => {
  const { customerId } = useParams();
  const { t } = useTranslation(["common", "customers"]);

  if (!customerId) return null;
  const title = t("dictionary.customer");

  return (
    <ContentLayout
      title={title}
      errorFallback={{
        title,
      }}
      locations={[
        {
          name: t("dictionary.dashboard"),
          path: "/app",
        },
        {
          name: t("dictionary.customers"),
          path: "/app/customers",
        },
        {
          name: title,
        },
      ]}
    >
      <ViewCustomer customerId={customerId} />
    </ContentLayout>
  );
};
