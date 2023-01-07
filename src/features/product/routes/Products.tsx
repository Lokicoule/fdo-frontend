import { Service } from "~/components/Elements/Service";
import { CreateProductForm } from "../components/CreateProductForm";

import { ContentLayout } from "~/components/Layout/ContentLayout";

export const Products: React.FunctionComponent = () => {
  console.info("Products render");

  return (
    <ContentLayout>
      <Service>
        <CreateProductForm></CreateProductForm>
      </Service>
    </ContentLayout>
  );
};
