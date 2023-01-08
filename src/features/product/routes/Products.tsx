import { Service } from "~/components/Elements/Service";
import { CreateProductForm } from "../components/CreateProductForm";

import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ProductsList } from "../components/ProductsList";

export const Products: React.FunctionComponent = () => {
  console.info("Products render");

  return (
    <ContentLayout>
      <Service>
        <CreateProductForm />
        <ProductsList />
      </Service>
    </ContentLayout>
  );
};
