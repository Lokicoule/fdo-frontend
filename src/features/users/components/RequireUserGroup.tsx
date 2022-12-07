import { useGroups } from "../../authentication/stores/authStore";
import { CreateUserModal } from "./CreateUser";

type Props = { children: JSX.Element };

export const RequireUserGroup = (props: Props): JSX.Element => {
  const { children } = props;
  const userGroups = useGroups();

  if (!userGroups?.includes("User")) {
    return <CreateUserModal />;
  }

  return children;
};
