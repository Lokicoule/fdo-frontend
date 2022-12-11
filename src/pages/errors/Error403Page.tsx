import { PageErrorTemplate } from "~/components/PageErrorTemplate";

export const Error403Page: React.FunctionComponent = () => {
  return (
    <PageErrorTemplate
      title="403"
      description="Sorry, you are not authorized to access this page."
    />
  );
};
