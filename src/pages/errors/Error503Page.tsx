import { PageErrorTemplate } from "~/components/PageErrorTemplate";

export const Error500Page: React.FunctionComponent = () => {
  return (
    <PageErrorTemplate
      title="503"
      description="Service unavailable, please try later!"
    />
  );
};
