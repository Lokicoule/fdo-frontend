import { PageErrorTemplate } from "~/components/PageErrorTemplate";

export const Error500Page: React.FunctionComponent = () => {
  return (
    <PageErrorTemplate title="500" description="Woops, something went wrong." />
  );
};
