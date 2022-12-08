import { RequireAuth } from "../../authentication";
import { useGroups } from "../../authentication/stores/authStore";
import { CreateUserModal } from "./CreateUser";

export type RequireUserGroupProps = { children: JSX.Element };

export const RequireUserGroup: React.FunctionComponent<
  RequireUserGroupProps
> = (props): JSX.Element => {
  const { children } = props;

  const userGroups = useGroups();

  if (!userGroups?.includes("User")) {
    return (
      <RequireAuth>
        <CreateUserModal />
      </RequireAuth>
    );
  }

  return <RequireAuth>{children}</RequireAuth>;
};
