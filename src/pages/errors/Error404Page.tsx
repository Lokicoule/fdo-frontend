import { PageErrorTemplate } from "../../components/PageErrorTemplate";

export const Error404Page: React.FunctionComponent = () => {
  return (
    <PageErrorTemplate
      title="404"
      description="Sorry, the page you are looking for does not exist."
    />
  );
};
