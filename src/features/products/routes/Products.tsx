import { Service } from "~/components/Elements/Service";
import { CreateProduct } from "../components/CreateProduct";

import { ContentLayout } from "~/components/Layout/ContentLayout";
import { ProductsList } from "../components/ProductsList";

export const Products: React.FunctionComponent = () => {
  console.info("Products render");

  return (
    <ContentLayout>
      <Service>
        <ProductsList />
      </Service>
    </ContentLayout>
  );
};
