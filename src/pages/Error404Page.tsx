import { PageError } from "../components/PageError";

export const Error404Page: React.FunctionComponent = () => {
  const redirect = {
    to: "/home",
    label: "Go to home page",
  };

  return (
    <PageError
      title="404"
      description="Sorry, the page you are looking for does not exist."
      redirect={redirect}
    />
  );
};
