import { useGroups } from "../../authentication/stores/authStore";
import { CreateUserContent } from "./CreateUserContent";

type Props = { children: JSX.Element };

export const RequireUserGroup = (props: Props): JSX.Element => {
  const { children } = props;
  const userGroups = useGroups();

  if (!userGroups?.includes("User")) {
    return <CreateUserContent />;
  }

  return children;
};
