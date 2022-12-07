import { RequireAuth } from "../../authentication";
import { useGroups } from "../../authentication/stores/authStore";
import { CreateUserModal } from "./CreateUser";

type Props = { children: JSX.Element };

/**
 * @description Prevents access to the children if the user is not in the User group.
 */
export const RequireUserGroup = (props: Props): JSX.Element => {
  const { children } = props;
  const userGroups = useGroups();

  if (userGroups?.includes("User")) {
    return (
      <RequireAuth>
        <CreateUserModal />
      </RequireAuth>
    );
  }

  return <RequireAuth>{children}</RequireAuth>;
};
