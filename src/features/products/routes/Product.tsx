import { useParams } from "react-router-dom";
import { ContentLayout } from "~/components/Layout/ContentLayout";
import { useGetProduct } from "../api/getProduct";
import { Service } from "~/components/Elements/Service";

export const Product: React.FunctionComponent = () => {
  const { productId } = useParams();

  if (!productId) {
    return null;
  }

  const productQuery = useGetProduct({
    variables: {
      getProductId: productId,
    },
  });

  if (productQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!productQuery.data) return <div>Product not found</div>;

  return (
    <ContentLayout>
      <Service>
        <div>{productQuery.data.label}</div>
        <div>{productQuery.data.code}</div>
      </Service>
    </ContentLayout>
  );
};
